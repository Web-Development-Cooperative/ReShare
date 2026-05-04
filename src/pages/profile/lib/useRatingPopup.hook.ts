import { useGetMyProfileQuery, useGetUserReviewsQuery } from '@entities/users';

const useRatingPopup = () => {
	const { data: profileData } = useGetMyProfileQuery();
	const { data: reviewsData } = useGetUserReviewsQuery(
		{ id: profileData?.id ?? 'zxc' },
		{ skip: !profileData },
	);

	console.log(reviewsData);

	return { reviewsData };
};

export { useRatingPopup };
