import { useGetMyProfileQuery, useGetUserReviewsQuery } from '@entities/users';

const useRatingPopup = () => {
	const { data: profileData } = useGetMyProfileQuery(undefined, {
		refetchOnMountOrArgChange: false,
	});
	const { data: reviewsData } = useGetUserReviewsQuery(
		{ id: profileData?.id ?? 'zxc' },
		{ skip: !profileData, refetchOnMountOrArgChange: false },
	);

	return { reviewsData };
};

export { useRatingPopup };
