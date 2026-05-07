import img from '@shared/assets/img/baseAvatarMale.png';

import type { MessageDto } from '@shared/api/generated/messaging-api';

const CHAT_INTERLOCUTOR = {
	id: 1,
	fullName: 'Андрей Лампов',
	img: img,
	online: true,
	subject: 'Большой серый диван • Запрос #2',
	status: 'Зарезервировано',
};

const CURRENT_USER_ID = 2;

const CHAT_MESSAGES: Array<MessageDto> = [
	{
		id: '1',
		conversationId: '1',
		senderId: '1',
		content: 'Ы',
		sentAt: '09:10',
		isRead: false,
	},
	{
		id: '2',
		conversationId: '1',
		senderId: 'fb73d692-25e4-47f2-9939-78c2afca9a37',
		content: 'Доброе утро, да',
		sentAt: '09:10',
		isRead: false,
	},
	{
		id: '3',
		conversationId: '1',
		senderId: '1',
		content: 'Когда можно будет забрать?',
		sentAt: '09:10',
		isRead: false,
	},
	{
		id: '4',
		conversationId: '1',
		senderId: '1',
		content: 'Адрес актуальный?',
		sentAt: '09:10',
		isRead: false,
	},
	{
		id: '5',
		conversationId: '1',
		senderId: 'fb73d692-25e4-47f2-9939-78c2afca9a37',
		content:
			'Можно будет после 19:00, адрес правильный. Мой телефон +7 800 555 35 35',
		sentAt: '09:10',
		isRead: false,
	},
	{
		id: '6',
		conversationId: '1',
		senderId: '1',
		content:
			'Отлично, давайте тогда зарезервирую, подтвердите запрос, пожалуйста. Вызову газель к этому времени и подъеду',
		sentAt: '09:10',
		isRead: false,
	},
	{
		id: '7',
		conversationId: '1',
		senderId: 'fb73d692-25e4-47f2-9939-78c2afca9a37',
		content: 'Добро, жду',
		sentAt: '09:10',
		isRead: false,
	},
];

export { CHAT_INTERLOCUTOR, CURRENT_USER_ID, CHAT_MESSAGES };
