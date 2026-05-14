import { useState } from 'react';

import { useGetMyProfileQuery } from '@entities/users';

const useHeader = () => {
	const { data: profile } = useGetMyProfileQuery(undefined, {
		refetchOnMountOrArgChange: false,
	});

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMobileMenuOpen((prev) => !prev);
	};

	const handleLinkClick = () => {
		setIsMobileMenuOpen(false);
	};

	return {
		profile,
		isMobileMenuOpen,
		toggleMenu,
		handleLinkClick,
	};
};

export { useHeader };
