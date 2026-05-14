import { useEffect, useMemo, useState } from 'react';

import { useGetMyListingsQuery } from '@entities/listings';
import { useGetMyProfileQuery } from '@entities/users';
import { notification } from '@shared/lib/toast.helper';
import { TransferTypeRu } from '@shared/model/translates.consts';
import {
	ListingStatus,
	TransferType,
} from '@shared/api/generated/listings-api';

import { items } from '../model/myApplicationPage.consts';

const PAGE_SIZE = 8;

const useMyApplicationPage = () => {
	const [page, setPage] = useState(1);

	const { data, isLoading, isError } = useGetMyListingsQuery(
		{ pageNumber: 1, pageSize: 10000 },
		{ refetchOnMountOrArgChange: false },
	);
	const { data: profile } = useGetMyProfileQuery(undefined, {
		refetchOnMountOrArgChange: false,
	});

	const activeAds = useMemo(() => {
		const listingItems = data?.items?.length ? data.items : items;

		return listingItems
			.filter(
				(item) =>
					item.status !== ListingStatus.Completed &&
					item.transferType === TransferType.Charity,
			)
			.map((item) => ({
				id:
					item.id ??
					`${item.title ?? 'listing'}-${item.createdAt ?? 'now'}`,
				img:
					item.thumbnailUrl ??
					'https://placehold.co/600x400?text=No+Photo',
				title: item.title ?? 'Без названия',
				author: `${profile?.firstName ?? 'Пользователь'} ${profile?.lastName ?? ''}`,
				authorAvatarUrl: profile?.avatarUrl ?? undefined,
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
	}, [data?.items, profile]);

	const totalPages = Math.max(1, Math.ceil(activeAds.length / PAGE_SIZE));
	const pagedAds = activeAds.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

	const onPageChange = (p: number) => setPage(p);
	const onPageInc = () => setPage((p) => Math.min(p + 1, totalPages));
	const onPageDec = () => setPage((p) => Math.max(p - 1, 1));

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
		activeAds: pagedAds,
		isLoading,
		isError,
		currentPage: page,
		totalPages,
		totalElements: activeAds.length,
		cardinality: (page - 1) * PAGE_SIZE + pagedAds.length,
		onPageChange,
		onPageInc,
		onPageDec,
	};
};

export { useMyApplicationPage };
