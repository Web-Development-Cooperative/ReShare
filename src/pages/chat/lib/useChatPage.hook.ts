import { useEffect, useMemo, useRef, useState } from 'react';

import {
	useGetMessagesQuery,
	useGetConversationsQuery,
	useSendMessageMutation,
} from '@entities/messages';
import { useGetMyProfileQuery, useGetUserProfileQuery } from '@entities/users';
import img from '@shared/assets/img/baseAvatarMale.png';

import { CHAT_MESSAGES } from '../model/chatPage.consts';

import type { ChangeEvent, KeyboardEvent } from 'react';
import type { Message } from '../model/chatPage.types';

const useChatPage = () => {
	const [sendMessage] = useSendMessageMutation();
	const { data } = useGetMessagesQuery({ conversationId: '1' });
	const { data: allMessage } = useGetConversationsQuery({});
	const { data: myProfile } = useGetMyProfileQuery();
	const { data: otherProfile } = useGetUserProfileQuery(
		allMessage?.items
			.find((item) => item.id === data?.items[0].conversationId)
			?.participants.find((p) => p !== myProfile?.id) || '',
		{
			skip:
				!data?.items?.length &&
				!myProfile?.id &&
				!!allMessage?.items?.length,
		},
	);

	const [inputValue, setInputValue] = useState('');
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const messages: Array<Message> = useMemo(() => {
		const messages = data?.items?.length ? data.items : CHAT_MESSAGES;

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
	}, [
		data?.items,
		myProfile?.id,
		myProfile?.avatarUrl,
		otherProfile?.avatarUrl,
	]);

	const changeValue = (
		e: ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
	) => {
		setInputValue(e.target.value);
	};
	const handleSend = () => {
		sendMessage({
			conversationId: data?.items[0].conversationId || '',
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

	return {
		messages,
		messagesEndRef,
		inputValue,
		changeValue,
		handleKeyDown,
		handleSend,
	};
};

export { useChatPage };
