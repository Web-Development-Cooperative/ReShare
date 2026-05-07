import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

import { useGetListingsQuery, useGetCategoriesQuery } from '@entities/listings';
import { notification } from '@shared/lib/toast.helper';
import { TransferTypeRu } from '@shared/model/translates.consts';
import {
	ListingStatus,
	TransferType,
} from '@shared/api/generated/listings-api';

import { filters } from '../model/adsPage.consts';

const useAdsPage = () => {
	const [showFilters, setShowFilters] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();

	const filterState = useMemo<Record<string, string>>(() => {
		const result: Record<string, string> = {};
		searchParams.forEach((value, key) => {
			result[key] = value;
		});
		return result;
	}, [searchParams]);

	const searchQuery = searchParams.get('search') ?? '';
	const currentPage = parseInt(searchParams.get('page') ?? '1', 10);
	const PAGE_SIZE = 1;

	const onSearchChange = (value: string) => {
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			if (value) {
				next.set('search', value.toLowerCase());
			} else {
				next.delete('search');
			}
			next.set('page', '1');
			return next;
		});
	};

	const setPage = (page: number) => {
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			next.set('page', String(page));
			return next;
		});
	};

	const onPageChange = (page: number) => setPage(page);
	const onPageInc = () => setPage(currentPage + 1);
	const onPageDec = () => setPage(Math.max(1, currentPage - 1));

	const { data, isLoading, isError } = useGetListingsQuery(
		{
			categoryId: filterState['category'] ?? '',
			condition: filterState['condition'] ?? '',
			transferType: filterState['type'] ?? '',
			searchQuery: searchQuery || undefined,
			pageNumber: currentPage,
			pageSize: PAGE_SIZE,
		},
		{ refetchOnMountOrArgChange: true },
	);
	const { data: categoriesData } = useGetCategoriesQuery(undefined, {
		refetchOnMountOrArgChange: false,
	});

	const onChangeOption = (val: string, filterType: Record<'id', string>) => {
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			if (val) {
				next.set(filterType.id, val);
			} else {
				next.delete(filterType.id);
			}
			next.set('page', '1');
			return next;
		});
	};

	const allFilters = useMemo(() => {
		return filters.map((filter) => {
			if (filter.id === 'category') {
				return {
					...filter,
					options:
						categoriesData?.map((cat) => ({
							value: cat.id,
							label: cat.name,
						})) ?? [],
				};
			}
			return filter;
		});
	}, [categoriesData]);

	const allAds = useMemo(() => {
		const listingItems = data?.items?.length ? data.items : [];

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
				author: item.donor
					? `${item.donor.firstName} ${item.donor.lastName}`
					: 'Неизвестный автор',
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
	}, [data]);

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
		allFilters,
		filterState,
		onChangeOption,
		searchQuery,
		onSearchChange,
		currentPage,
		totalPages: data?.totalPages ?? 1,
		totalElements: data?.totalCount ?? 0,
		cardinality:
			(data?.items?.length || 0) +
			(data?.pageSize || 0) * (+currentPage - 1),
		onPageChange,
		onPageInc,
		onPageDec,
	};
};

export { useAdsPage };
