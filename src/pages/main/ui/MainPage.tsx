import { ButtonBase } from '@shared/ui/buttons/buttonBase/ButtonBase';
import { Loupe } from '@shared/ui/icons/loupe/Loupe';
import { Settings } from '@shared/ui/icons/settings/Settings';
import { InputBase } from '@shared/ui/inputs/inputBase/InputBase';
import { UniList } from '@shared/ui/others';
import { UIText14SB } from '@shared/ui/paragraphs';
import { BgBorderDefault } from '@shared/ui/wrappers';

import AdCard from './adCard/AdCard';
import styles from './MainPage.module.css';

const mockCards = [
	{
		id: 1,
		title: 'Большой серый диван',
		description: '1.2 км ~ Екатеринбург, ВИЗ',
		author: 'Аполлинария В.',
		tags: [
			{ id: 1, name: 'Тег 1' },
			{ id: 2, name: 'Тег 2' },
			{ id: 3, name: 'Тег 3' },
		],
		img: 'https://cloud.pllsll.ru/1366x/pollskill/storage/f7/09/3/b5e94b9b7c7.jpg',
	},
	{
		id: 2,
		title: 'Объявление 2',
		description: 'Описание объявления 2',
		author: 'Автор 2',
		tags: [
			{ id: 1, name: 'Тег 1' },
			{ id: 2, name: 'Тег 2' },
			{ id: 3, name: 'Тег 3' },
		],
		img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8I1L_wZQ_0JJWlg-Si8hwzph7G_2aQpEx_Q&s',
	},
	{
		id: 3,
		title: 'Объявление 3',
		description: 'Описание объявления 3',
		author: 'Автор 3',
		tags: [
			{ id: 1, name: 'Тег 1' },
			{ id: 2, name: 'Тег 2' },
			{ id: 3, name: 'Тег 3' },
		],
		img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkRyGeTDutsYxIg8rkkeU8Ks46IHtKz6BJMA&s',
	},
	{
		id: 4,
		title: 'Объявление 4',
		description: 'Описание объявления 4',
		author: 'Автор 4',
		tags: [
			{ id: 1, name: 'Тег 1' },
			{ id: 2, name: 'Тег 2' },
			{ id: 3, name: 'Тег 3' },
		],
		img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7JUHfJJowOsLhI-ijnvSYCIRFCpmUv3WxSg&s',
	},
	{
		id: 5,
		title: 'Объявление 5',
		description: 'Описание объявления 5',
		author: 'Автор 5',
		tags: [
			{ id: 1, name: 'Тег 1' },
			{ id: 2, name: 'Тег 2' },
			{ id: 3, name: 'Тег 3' },
		],
		img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7JUHfJJowOsLhI-ijnvSYCIRFCpmUv3WxSg&s',
	},
];

const MainPage = () => {
	return (
		<div className={styles.main}>
			<h1>Лента объявлений</h1>
			<div className={styles.finderContainer}>
				<InputBase
					className={styles['fat-input']}
					placeholder="Поиск по доступным обновлениям"
					leftIcon={<Loupe />}
				/>
				<ButtonBase color="shaded">
					<Settings />
					<UIText14SB>Фильтры</UIText14SB>
				</ButtonBase>
			</div>
			<BgBorderDefault colorType="surface-1">
				<UniList
					className={styles.cardList}
					items={mockCards}
					renderItem={(item) => <AdCard {...item} />}
				></UniList>
			</BgBorderDefault>
		</div>
	);
};

export { MainPage };
