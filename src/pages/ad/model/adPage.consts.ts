import avatar from '@shared/assets/img/baseAvatarMale.png';

const img = 'https://placehold.co/600x400?text=Main+Ad';
const imgAlt = 'Фото объявления';
const metrics = [
	{
		id: 'wasteSavedG',
		title: 'г',
		value: '0',
		description: 'Будет спасено от захоронения',
	},
	{
		id: 'co2SavedG',
		title: 'г CO2',
		value: '0',
		description: 'Не попадет в атмосферу',
	},
	{
		id: 'waterSavedM3',
		title: 'м3 воды',
		value: '0',
		description: 'будет сохранено',
	},
	{
		id: 'energySavedMWh',
		title: 'МВт•ч энергии',
		value: '0',
		description: 'будет сэкономлено',
	},
];
const title = 'Продам велосипед';
const tags = [
	{ id: '1', tag: 'Мебель' },
	{ id: '2', tag: 'Отличное состояние' },
	{ id: '3', tag: 'Дарение' },
];
const description =
	'Диван серого цвета, 3 года в эксплуатации. Чистый, без пятен и дефектов. Переезжаю в другой город. Могу отдать по будням после 19:00 по указанному адресу';
const transMethod = 'Доставка, личная встреча';
const avatarUrl = avatar;
const fio = 'Аполлинария В.';
const rating = 4.3;
const year = 2010;
const location = 'Екатеринбург, Верх-Исетский район, ул. Татищева 94';
const date = '20.10.2010';
const views = 2010;

export {
	img,
	imgAlt,
	metrics,
	title,
	tags,
	description,
	transMethod,
	avatarUrl,
	fio,
	rating,
	year,
	location,
	date,
	views,
};
