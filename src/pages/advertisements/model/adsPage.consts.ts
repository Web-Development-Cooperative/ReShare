import {
	ItemCondition,
	ListingStatus,
	TransferType,
} from '@shared/api/generated/listings-api';

const items = [
	{
		id: 1,
		title: 'Большой серый диван',
		description: '1.2 км ~ Екатеринбург, ВИЗ',
		author: 'Аполлинария В.',
		status: ListingStatus.Active,
		city: 'Москва',
		thumbnailUrl:
			'https://cloud.pllsll.ru/1366x/pollskill/storage/f7/09/3/b5e94b9b7c7.jpg',
		category: { id: 'cat-1', name: 'Книги' },
		createdAt: '2026-04-05T10:00:00Z',
		transferType: TransferType.Gift,
	},
	{
		id: 2,
		title: 'Объявление 2',
		description: 'Описание объявления 2',
		author: 'Автор 2',
		status: ListingStatus.Active,
		city: 'Санкт-Петербург',
		thumbnailUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8I1L_wZQ_0JJWlg-Si8hwzph7G_2aQpEx_Q&s',
		category: { id: 'cat-2', name: 'Мебель' },
		createdAt: '2026-04-01T10:00:00Z',
		transferType: TransferType.Exchange,
	},
	{
		id: 3,
		title: 'Объявление 3',
		description: 'Описание объявления 3',
		author: 'Автор 3',
		status: ListingStatus.Reserved,
		city: 'Казань',
		thumbnailUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkRyGeTDutsYxIg8rkkeU8Ks46IHtKz6BJMA&s',
		category: { id: 'cat-3', name: 'Музыка' },
		createdAt: '2026-04-09T10:00:00Z',
		transferType: TransferType.Charity,
	},
	{
		id: 4,
		title: 'Объявление 4',
		description: 'Описание объявления 4',
		author: 'Автор 4',
		status: ListingStatus.Completed,
		city: 'Екатеринбург',
		thumbnailUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7JUHfJJowOsLhI-ijnvSYCIRFCpmUv3WxSg&s',
		category: { id: 'cat-4', name: 'Мебель' },
		createdAt: '2026-04-01T10:00:00Z',
		transferType: TransferType.Gift,
	},
	{
		id: 5,
		title: 'Объявление 5',
		description: 'Описание объявления 5',
		author: 'Автор 5',
		status: ListingStatus.Active,
		city: 'Новосибирск',
		thumbnailUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7JUHfJJowOsLhI-ijnvSYCIRFCpmUv3WxSg&s',
		category: { id: 'cat-5', name: 'Спорт' },
		createdAt: '2026-04-07T10:00:00Z',
		transferType: TransferType.Exchange,
	},
];

const TYPE_OPTIONS_EN: Array<{ value: TransferType; label: string }> = [
	{ value: TransferType.Gift, label: 'Дарение' },
	{ value: TransferType.Exchange, label: 'Обмен' },
	{ value: TransferType.Charity, label: 'Запрос' },
];
const CONDITION_OPTIONS: Array<{ value: ItemCondition; label: string }> = [
	{ value: ItemCondition.New, label: 'Новый' },
	{ value: ItemCondition.LikeNew, label: 'Как новый' },
	{ value: ItemCondition.Good, label: 'Хороший' },
	{ value: ItemCondition.Fair, label: 'Удовлетворительный' },
	{ value: ItemCondition.Poor, label: 'Плохой' },
];
const filters = [
	{
		id: 'category',
		options: [],
		placeholder: 'Все категории',
	},
	{
		id: 'type',
		options: TYPE_OPTIONS_EN,
		placeholder: 'Тип объявления',
	},
	{
		id: 'condition',
		options: CONDITION_OPTIONS,
		placeholder: 'Состояние',
	},
];

export { items, filters };
