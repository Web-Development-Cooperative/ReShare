import { useEffect, useRef, useState } from 'react';

import { CHAT_MESSAGES, CURRENT_USER_ID } from '../model/chatPage.consts';

import type { ChangeEvent, KeyboardEvent } from 'react';
import type { Message } from '../model/chatPage.types';

const useChatPage = () => {
	const [messages, setMessages] = useState(CHAT_MESSAGES);
	const [inputValue, setInputValue] = useState('');
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const changeValue = (
		e: ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
	) => {
		setInputValue(e.target.value);
	};
	const handleSend = () => {
		const text = inputValue.trim();
		if (!text) return;

		const newMessage: Message = {
			id: messages.length + 1,
			senderId: CURRENT_USER_ID,
			senderName: 'Белобрысый чепух',
			senderAvatar: '',
			time: new Date().toLocaleTimeString('ru-RU', {
				hour: '2-digit',
				minute: '2-digit',
			}),
			text,
		};

		setMessages((prev) => [...prev, newMessage]);
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
