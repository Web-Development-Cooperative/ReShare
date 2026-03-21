import { useEffect } from 'react';

const usePopup = () => {
	const container = document.getElementById('popup-root');

	useEffect(() => {
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = '';
		};
	}, []);

	return container;
};

export { usePopup };
