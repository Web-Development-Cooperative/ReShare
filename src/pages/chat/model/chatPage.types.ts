import type { FC } from 'react';

type Message = {
	id: number;
	senderId: number;
	senderName: string;
	senderAvatar: string;
	time: string;
	text: string;
};
type ChatMessageItem = {
	message: Message;
};
type ChatMessageItemProps = FC<ChatMessageItem>;

export type { ChatMessageItemProps, Message };
