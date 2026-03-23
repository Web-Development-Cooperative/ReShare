import type { Message } from '../model/messagesPage.types';

const MESSAGE_ARRAY: Array<Message> = [
	{
		id: 1,
		img: 'asdf',
		online: true,
		fullName: 'Андрей Лампов',
		descr: 'Большой серый диван',
		missed: 7,
	},
	{
		id: 2,
		img: 'xsxx',
		online: false,
		fullName: 'Аполлинария В.',
		descr: 'Большой серый диван',
		missed: 0,
	},
];

export { MESSAGE_ARRAY };
