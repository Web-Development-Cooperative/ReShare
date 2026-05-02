import img from '@shared/assets/img/baseAvatarMale.png';

import type { Message } from './chatPage.types';

const CHAT_INTERLOCUTOR = {
	id: 1,
	fullName: 'Андрей Лампов',
	img: img,
	online: true,
	subject: 'Большой серый диван • Запрос #2',
	status: 'Зарезервировано',
};

const CURRENT_USER_ID = 2;

const CHAT_MESSAGES: Array<Message> = [
	{
		id: 1,
		senderId: 1,
		senderName: 'Андрей Лампов',
		senderAvatar: img,
		time: '09:10',
		text: 'Здравствуйте! Еще актуально?',
	},
	{
		id: 2,
		senderId: 2,
		senderName: 'Белобрысый чепух',
		senderAvatar: img,
		time: '09:14',
		text: 'Доброе утро, да',
	},
	{
		id: 3,
		senderId: 1,
		senderName: 'Андрей Лампов',
		senderAvatar: img,
		time: '09:18',
		text: 'Когда можно будет забрать?',
	},
	{
		id: 4,
		senderId: 1,
		senderName: 'Андрей Лампов',
		senderAvatar: img,
		time: '09:19',
		text: 'Адрес актуальный?',
	},
	{
		id: 5,
		senderId: 2,
		senderName: 'Белобрысый чепух',
		senderAvatar: img,
		time: '09:20',
		text: 'Можно будет после 19:00, адрес правильный. Мой телефон +7 800 555 35 35',
	},
	{
		id: 6,
		senderId: 1,
		senderName: 'Андрей Лампов',
		senderAvatar: img,
		time: '09:22',
		text: 'Отлично, давайте тогда зарезервирую, подтвердите запрос, пожалуйста. Вызову газель к этому времени и подъеду',
	},
	{
		id: 7,
		senderId: 2,
		senderName: 'Белобрысый чепух',
		senderAvatar: img,
		time: '09:28',
		text: 'Добро, жду',
	},
];

export { CHAT_INTERLOCUTOR, CURRENT_USER_ID, CHAT_MESSAGES };
