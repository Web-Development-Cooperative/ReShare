import { useMemo, useState } from 'react';

import { useGetMyProfileQuery } from '@entities/users';

import type { Metric } from '../model/profilePage.types';

const useProfilePage = () => {
	const { data } = useGetMyProfileQuery(undefined, {
		refetchOnMountOrArgChange: false,
	});

	const [openReview, setOpenReview] = useState(false);
	const [openEditProfile, setOpenEditProfile] = useState(false);

	const ecoMetrics: Array<Metric> = useMemo(
		() => [
			{
				id: '1',
				data: data
					? data?.ecoStats.itemsGifted + data?.ecoStats.itemsReceived
					: 0,
				title: 'Совершено сделок',
				description: '+12.4% в этом месяце',
			},
			{
				id: '2',
				data: data ? data?.ecoStats.co2SavedKg : 0,
				title: 'Не попало в атмосферу',
				description: 'Эквивалент 1000 деревьев в год',
			},
			{
				id: '3',
				data: data ? data?.ecoStats.wasteSavedKg : 0,
				title: 'Не попало на свалку',
				description: '+12.4% в этом месяце',
			},
		],
		[data],
	);

	console.log(data);

	return {
		data,
		openReview,
		ecoMetrics,
		setOpenReview,
		openEditProfile,
		setOpenEditProfile,
	};
};

export { useProfilePage };
