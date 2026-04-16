import { useEffect, useMemo } from 'react';

import { useGetMyListingsQuery } from '@entities/listings';
import { ListingStatus } from '@shared/api/generated/listings-api';
import { AdCard, UniList } from '@shared/ui/others';
import { BgBorderDefault } from '@shared/ui/wrappers';
import { notification } from '@shared/lib/toast.helper';

import styles from './MyAdsPage.module.css';

import type { ListingPreviewDto } from '@shared/api/generated/listings-api';

const items: ListingPreviewDto[] = [
	{
		id: 'mock-1',
		title: 'Учебник по математике',
		status: ListingStatus.Active,
		city: 'Москва',
		thumbnailUrl: 'https://placehold.co/600x400?text=Ad+1',
		category: { id: 'cat-1', name: 'Книги' },
		createdAt: '2026-04-01T10:00:00Z',
	},
	{
		id: 'mock-2',
		title: 'Ноутбук для учебы',
		status: ListingStatus.Active,
		city: 'Санкт-Петербург',
		thumbnailUrl: 'https://placehold.co/600x400?text=Ad+2',
		category: { id: 'cat-2', name: 'Техника' },
		createdAt: '2026-04-02T10:00:00Z',
	},
	{
		id: 'mock-3',
		title: 'Настольная лампа',
		status: ListingStatus.Active,
		city: 'Казань',
		thumbnailUrl: 'https://placehold.co/600x400?text=Ad+3',
		category: { id: 'cat-3', name: 'Дом' },
		createdAt: '2026-04-03T10:00:00Z',
	},
	{
		id: 'mock-4',
		title: 'Гитара акустическая',
		status: ListingStatus.Active,
		city: 'Екатеринбург',
		thumbnailUrl: 'https://placehold.co/600x400?text=Ad+4',
		category: { id: 'cat-4', name: 'Музыка' },
		createdAt: '2026-04-04T10:00:00Z',
	},
	{
		id: 'mock-5',
		title: 'Кресло офисное',
		status: ListingStatus.Active,
		city: 'Новосибирск',
		thumbnailUrl: 'https://placehold.co/600x400?text=Ad+5',
		category: { id: 'cat-5', name: 'Мебель' },
		createdAt: '2026-04-05T10:00:00Z',
	},
	{
		id: 'mock-6',
		title: 'Рюкзак городской',
		status: ListingStatus.Active,
		city: 'Самара',
		thumbnailUrl: 'https://placehold.co/600x400?text=Ad+6',
		category: { id: 'cat-6', name: 'Аксессуары' },
		createdAt: '2026-04-06T10:00:00Z',
	},
	{
		id: 'mock-7',
		title: 'Велосипед',
		status: ListingStatus.Active,
		city: 'Краснодар',
		thumbnailUrl: 'https://placehold.co/600x400?text=Ad+7',
		category: { id: 'cat-7', name: 'Спорт' },
		createdAt: '2026-04-07T10:00:00Z',
	},
	{
		id: 'mock-8',
		title: 'Куртка демисезонная',
		status: ListingStatus.Active,
		city: 'Нижний Новгород',
		thumbnailUrl: 'https://placehold.co/600x400?text=Ad+8',
		category: { id: 'cat-8', name: 'Одежда' },
		createdAt: '2026-04-08T10:00:00Z',
	},
	{
		id: 'mock-9',
		title: 'Наушники',
		status: ListingStatus.Active,
		city: 'Ростов-на-Дону',
		thumbnailUrl: 'https://placehold.co/600x400?text=Ad+9',
		category: { id: 'cat-9', name: 'Электроника' },
		createdAt: '2026-04-09T10:00:00Z',
	},
];

const MyAdsPage = () => {
	const { data, isLoading, isError } = useGetMyListingsQuery({
		pageNumber: 1,
		pageSize: 50,
	});

	const activeAds = useMemo(() => {
		const listingItems = data?.items?.length ? data.items : items;

		return listingItems
			.filter((item) => item.status === ListingStatus.Active)
			.map((item) => ({
				id:
					item.id ??
					`${item.title ?? 'listing'}-${item.createdAt ?? 'now'}`,
				img:
					item.thumbnailUrl ??
					'https://placehold.co/600x400?text=No+Photo',
				title: item.title ?? 'Без названия',
				author: 'Вы',
				description: item.city
					? `Город: ${item.city}`
					: 'Город не указан',
				tags: [
					{ id: `${item.id}-status`, name: item.status ?? 'Unknown' },
					{
						id: `${item.id}-category`,
						name: item.category?.name ?? 'Без категории',
					},
				],
			}));
	}, [data?.items]);

	useEffect(() => {
		if (isLoading) {
			notification.loading('Загрузка объявлений...', {
				autoClose: false,
				toastId: 'loading-ads',
			});

			return () => notification.dismiss('loading-ads');
		}
	}, [isLoading]);

	if (isLoading) {
		return (
			<BgBorderDefault colorType="surface-1">
				<div>Загрузка объявлений...</div>
			</BgBorderDefault>
		);
	}

	if (isError) {
		notification.error('Ошибка загрузки объявлений. Попробуйте снова.', {
			toastId: 'load-ads-error',
		});
		return (
			<BgBorderDefault colorType="surface-1">
				<div>Не удалось загрузить объявления.</div>
			</BgBorderDefault>
		);
	}

	if (!activeAds.length) {
		notification.info('У вас пока нет активных объявлений.', {
			toastId: 'no-active-ads',
		});
		return (
			<BgBorderDefault colorType="surface-1">
				<div>У вас пока нет активных объявлений.</div>
			</BgBorderDefault>
		);
	}

	return (
		<BgBorderDefault colorType="surface-1">
			<UniList
				className={styles['ads-list']}
				items={activeAds}
				renderItem={(item) => <AdCard {...item} />}
			/>
		</BgBorderDefault>
	);
};

export { MyAdsPage };
