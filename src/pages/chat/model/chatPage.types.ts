import type { FC } from 'react';

type Message = {
	id: string;
	senderId: string;
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
