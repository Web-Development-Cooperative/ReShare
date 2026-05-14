import { useEffect, useMemo } from 'react';

import { useGetMyListingsQuery } from '@entities/listings';
import { useGetMyProfileQuery } from '@entities/users';
import { notification } from '@shared/lib/toast.helper';
import { TransferTypeRu } from '@shared/model/translates.consts';
import {
	ListingStatus,
	TransferType,
} from '@shared/api/generated/listings-api';

import { items } from '../model/myArchivePage.consts';

const useMyArchivePage = () => {
	const { data, isLoading, isError } = useGetMyListingsQuery(
		{
			pageNumber: 1,
			pageSize: 50,
		},
		{ refetchOnMountOrArgChange: false },
	);
	const { data: myProfile } = useGetMyProfileQuery(undefined, {
		refetchOnMountOrArgChange: false,
	});

	const activeAds = useMemo(() => {
		const listingItems = data?.items?.length ? data.items : items;

		return listingItems
			.filter((item) => item.status === ListingStatus.Completed)
			.map((item) => ({
				id:
					item.id ??
					`${item.title ?? 'listing'}-${item.createdAt ?? 'now'}`,
				img:
					item.thumbnailUrl ??
					'https://placehold.co/600x400?text=No+Photo',
				title: item.title ?? 'Без названия',
				author: `${myProfile?.firstName ?? 'Без имени'} ${myProfile?.lastName ?? ''}`.trim(),
				authorAvatarUrl: myProfile?.avatarUrl ?? undefined,
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
	}, [data?.items, myProfile]);

	useEffect(() => {
		if (isLoading) {
			notification.loading('Загрузка объявлений...', {
				autoClose: false,
				toastId: 'loading-ads',
			});

			return () => notification.dismiss('loading-ads');
		}
	}, [isLoading]);

	return { activeAds, isLoading, isError };
};

export { useMyArchivePage };
