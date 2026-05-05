import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router';

import {
	messagesApi,
	useGetMessagesQuery,
	useGetConversationsQuery,
	useMarkAsReadMutation,
} from '@entities/messages';
import { useGetMyProfileQuery, useGetUserProfileQuery } from '@entities/users';
import { useAppDispatch } from '@app/store/hooks';
import img from '@shared/assets/img/baseAvatarMale.png';
import { MessageHub } from '@shared/api/signalR/messageHub';

import type { ChangeEvent, KeyboardEvent } from 'react';
import type { MessageDto as SignalRMessageDto } from '@shared/api/signalR/messageHub';
import type { Message } from '../model/chatPage.types';

const useChatPage = () => {
	const { chatId } = useParams<{ chatId: string }>();
	const dispatch = useAppDispatch();

	const { data } = useGetMessagesQuery(
		{ conversationId: chatId || '' },
		{ skip: !chatId },
	);
	const { data: allMessage } = useGetConversationsQuery({});
	const { data: myProfile } = useGetMyProfileQuery();
	const { data: otherProfile } = useGetUserProfileQuery(
		allMessage?.items
			.find((item) => item.id === chatId)
			?.participants.find((p) => p.id !== myProfile?.id)?.id || '42',
		{
			skip: !myProfile?.id || !chatId || !allMessage?.items?.length,
		},
	);

	const [inputValue, setInputValue] = useState('');
	const [markAsRead] = useMarkAsReadMutation();
	const messagesEndRef = useRef<HTMLDivElement>(null);
	// tempId → content: для замены optimistic-записи реальной при echo от сервера
	const pendingRef = useRef<Map<string, string>>(new Map());

	const listing = useMemo(() => {
		if (!allMessage?.items?.length) return '';
		return allMessage.items.find((chat) => chat.id === chatId)?.listing
			?.title;
	}, [allMessage, chatId]);

	const messages: Array<Message> = useMemo(() => {
		const items = data?.items?.length ? [...data.items] : [];
		items.sort(
			(a, b) =>
				new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime(),
		);
		return items.map((message) => ({
			id: message.id,
			senderId: message.senderId,
			senderName:
				message.senderId === myProfile?.id ? 'Вы' : 'Покупатель',
			senderAvatar:
				message.senderId === myProfile?.id
					? myProfile?.avatarUrl || img
					: otherProfile?.avatarUrl || img,
			time: message.sentAt,
			text: message.content,
		}));
	}, [myProfile?.id, data, myProfile?.avatarUrl, otherProfile?.avatarUrl]);

	// SignalR: подключение, вступление в группу разговора, патч RTK-кеша
	useEffect(() => {
		if (!chatId) return;
		const hub = MessageHub.getInstance();

		// start() — idempotent; joinConversation говорит серверу
		// слать события этого чата именно этому клиенту
		hub.start().then(() => {
			hub.joinConversation(chatId);
			// Отмечаем чат прочитанным при открытии
			markAsRead({ conversationId: chatId });
		});

		const onMessage = (message: SignalRMessageDto) => {
			if (message.conversationId !== chatId) return;

			dispatch(
				messagesApi.util.updateQueryData(
					'getMessages',
					{ conversationId: chatId },
					(draft) => {
						// Если это echo нашего собственного сообщения —
						// заменяем temp-запись реальной
						const tempId = pendingRef.current.get(message.content);
						if (tempId && message.senderId === myProfile?.id) {
							const idx = draft.items.findIndex(
								(m) => m.id === tempId,
							);
							if (idx !== -1) {
								draft.items[idx] = {
									id: message.id,
									conversationId: message.conversationId,
									senderId: message.senderId,
									content: message.content,
									sentAt: message.createdAt,
									isRead: message.isRead,
								};
								pendingRef.current.delete(message.content);
								return;
							}
						}
						// Сообщение от собеседника — добавляем и сразу отмечаем прочитанным
						if (!draft.items.find((m) => m.id === message.id)) {
							draft.items.push({
								id: message.id,
								conversationId: message.conversationId,
								senderId: message.senderId,
								content: message.content,
								sentAt: message.createdAt,
								isRead: message.isRead,
							});
							// Если чат открыт, сообщение читается автоматически
							if (message.senderId !== myProfile?.id) {
								markAsRead({ conversationId: chatId });
							}
						}
					},
				),
			);
		};

		hub.onMessageReceived(onMessage);

		return () => {
			hub.offHandler(
				'messagereceived',
				onMessage as (...args: unknown[]) => void,
			);
			hub.leaveConversation(chatId);
		};
	}, [chatId, dispatch, markAsRead, myProfile?.id]);

	const changeValue = (
		e: ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
	) => {
		setInputValue(e.target.value);
	};

	const handleSend = useCallback(async () => {
		if (!inputValue.trim() || !chatId || !myProfile?.id) return;
		const hub = MessageHub.getInstance();

		// Optimistic update — сообщение появляется мгновенно
		const tempId = `temp-${Date.now()}`;
		pendingRef.current.set(inputValue, tempId);
		dispatch(
			messagesApi.util.updateQueryData(
				'getMessages',
				{ conversationId: chatId },
				(draft) => {
					draft.items.push({
						id: tempId,
						conversationId: chatId,
						senderId: myProfile.id,
						content: inputValue,
						sentAt: new Date().toISOString(),
						isRead: false,
					});
				},
			),
		);

		const sentContent = inputValue;
		setInputValue('');

		try {
			await hub.sendMessage(chatId, sentContent);
		} catch {
			// Откат при ошибке отправки
			dispatch(
				messagesApi.util.updateQueryData(
					'getMessages',
					{ conversationId: chatId },
					(draft) => {
						const idx = draft.items.findIndex(
							(m) => m.id === tempId,
						);
						if (idx !== -1) draft.items.splice(idx, 1);
					},
				),
			);
			pendingRef.current.delete(sentContent);
			setInputValue(sentContent);
		}
	}, [chatId, inputValue, dispatch, myProfile]);

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	return {
		messages,
		messagesEndRef,
		inputValue,
		otherProfile,
		listing,
		changeValue,
		handleKeyDown,
		handleSend,
	};
};

export { useChatPage };
