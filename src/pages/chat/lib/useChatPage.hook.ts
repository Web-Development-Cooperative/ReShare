import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router';

import {
	useGetMessagesQuery,
	useGetConversationsQuery,
	useSendMessageMutation,
	useMarkAsReadMutation,
} from '@entities/messages';
import { useGetMyProfileQuery, useGetUserProfileQuery } from '@entities/users';
import img from '@shared/assets/img/baseAvatarMale.png';

import type { ChangeEvent, KeyboardEvent } from 'react';
import type { Message } from '../model/chatPage.types';

const useChatPage = () => {
	const { chatId } = useParams<{ chatId: string }>();
	const [sendMessage] = useSendMessageMutation();
	const [readMessage] = useMarkAsReadMutation();
	const { data } = useGetMessagesQuery(
		{ conversationId: chatId || '' },
		{ skip: !chatId },
	);
	const { data: allMessage } = useGetConversationsQuery({});
	const { data: myProfile } = useGetMyProfileQuery();
	const { data: otherProfile } = useGetUserProfileQuery(
		allMessage?.items
			.find((item) => item.id === chatId)
			?.participants.find((p) => p !== myProfile?.id) || '42',
		{
			skip: !myProfile?.id || !chatId || !allMessage?.items?.length,
		},
	);

	const [inputValue, setInputValue] = useState('');
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const listing = useMemo(() => {
		if (!allMessage?.items?.length) return '';
		return allMessage.items.find((chat) => chat.id === chatId)?.listingId;
	}, [allMessage, chatId]);

	const messages: Array<Message> = useMemo(() => {
		const messages = data?.items?.length
			? [...data.items].sort(
					(a, b) =>
						new Date(a.sentAt).getTime() -
						new Date(b.sentAt).getTime(),
				)
			: [];

		return messages.map((message) => ({
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

	const changeValue = (
		e: ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
	) => {
		setInputValue(e.target.value);
	};
	const handleSend = () => {
		sendMessage({
			conversationId: chatId || '',
			content: inputValue,
		});
		setInputValue('');
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	useEffect(() => {
		readMessage({ conversationId: chatId || '' });
	}, [chatId]);

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
