import { useGetMyProfileQuery } from '@entities/users';

const useRenderStepThree = () => {
	const { data: profile } = useGetMyProfileQuery(undefined, {
		refetchOnMountOrArgChange: false,
	});

	return {
		profile,
	};
};

export { useRenderStepThree };
