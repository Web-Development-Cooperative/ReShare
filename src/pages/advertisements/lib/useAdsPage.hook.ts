import { useEffect, useMemo, useState } from 'react';

import { useGetListingsQuery } from '@entities/listings';
import { notification } from '@shared/lib/toast.helper';
import { TransferTypeRu } from '@shared/model/translates.consts';
import {
	ListingStatus,
	TransferType,
} from '@shared/api/generated/listings-api';

import { items } from '../model/adsPage.consts';

const useAdsPage = () => {
	const { data, isLoading, isError } = useGetListingsQuery({
		pageNumber: 1,
		pageSize: 50,
	});

	const [showFilters, setShowFilters] = useState(false);
	const [filterState, setFilterState] = useState<Record<string, string>>({});

	const onChangeOption = (val: string, filterType: Record<'id', string>) =>
		setFilterState((s) => ({
			...s,
			[filterType.id]: val,
		}));

	const allAds = useMemo(() => {
		const listingItems = data?.items?.length ? data.items : items;

		return listingItems
			.filter((item) => item.status !== ListingStatus.Completed)
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
					{
						id: `${item.id}-transferType`,
						name: item.transferType
							? TransferTypeRu[
									item.transferType as keyof typeof TransferType
								]
							: 'без типа',
					},
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

	return {
		allAds,
		isLoading,
		isError,
		showFilters,
		setShowFilters,
		filterState,
		onChangeOption,
	};
};

export { useAdsPage };
