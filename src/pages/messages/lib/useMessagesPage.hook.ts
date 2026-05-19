import { useEffect, useState } from 'react';
import { useMatch } from 'react-router';

import { messagesApi, useGetConversationsQuery } from '@entities/messages';
import { useGetMyProfileQuery } from '@entities/users';
import { useAppDispatch } from '@app/store/hooks';
import { MessageHub } from '@shared/api/signalR/messageHub';

import type { MessageDto as SignalRMessageDto } from '@shared/api/signalR/messageHub';

const useMessagesPage = () => {
	const { data: messages } = useGetConversationsQuery({});
	const { data: user } = useGetMyProfileQuery();
	const dispatch = useAppDispatch();
	const isChatOpen = !!useMatch('/messages/:chatId');

	const [isMobile, setIsMobile] = useState(window.innerWidth < 856);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 856);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Логика скрытия: если мобильный И открыт чат -> скрываем сайдбар
	const shouldHideSidebar = isMobile && isChatOpen;

	// Вступаем во все загруженные разговоры, чтобы сервер слал события.
	// Зависимость — строка из ID, а не массив объектов, чтобы обновление
	// unreadCount/lastMessage не триггерило cleanup (выход из групп).
	const conversationIdsKey = (messages?.items ?? [])
		.map((c) => c.id)
		.join(',');

	useEffect(() => {
		if (!conversationIdsKey) return;
		const hub = MessageHub.getInstance();
		const ids = conversationIdsKey.split(',');

		hub.start().then(() => {
			ids.forEach((id) => hub.joinConversation(id));
		});
		// Не вызываем leaveConversation — сервер чистит группы при разрыве соединения.
		// Явный leave здесь вызывал бы выход из групп при каждом патче кеша.
	}, [conversationIdsKey]);

	// SignalR: обновляем список чатов в реальном времени,
	// когда приходит новое сообщение в любом разговоре
	useEffect(() => {
		const hub = MessageHub.getInstance();
		hub.start();

		const onMessage = (message: SignalRMessageDto) => {
			dispatch(
				messagesApi.util.updateQueryData(
					'getConversations',
					{},
					(draft) => {
						const conv = draft.items.find(
							(c) => c.id === message.conversationId,
						);
						if (!conv) return;

						// Обновляем lastMessage и unreadCount
						conv.lastMessage = {
							id: message.id,
							conversationId: message.conversationId,
							senderId: message.senderId,
							content: message.content,
							sentAt: message.createdAt,
							isRead: message.isRead,
						};
						conv.lastMessageAt = message.createdAt;

						// Счётчик увеличиваем только для входящих
						if (message.senderId !== user?.id) {
							conv.unreadCount += 1;
						}

						// Поднимаем чат наверх списка
						const idx = draft.items.indexOf(conv);
						if (idx > 0) {
							draft.items.splice(idx, 1);
							draft.items.unshift(conv);
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
		};
	}, [dispatch, user?.id]);

	return { messages: messages?.items, user, shouldHideSidebar };
};

export { useMessagesPage };
