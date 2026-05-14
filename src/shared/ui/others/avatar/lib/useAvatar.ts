import { useEffect, useState } from 'react';

import fallbackImage from '@shared/assets/img/baseAvatarMale.png';

import type { AvatarProps } from '@shared/model/otherUI.types';

const useAvatar = (src: Parameters<AvatarProps>[0]['src']) => {
	const [imgSrc, setImgSrc] = useState(src);

	useEffect(() => {
		setImgSrc(src);
	}, [src]);

	const handleError = () => {
		setImgSrc(fallbackImage);
	};

	return { imgSrc, handleError };
};

export { useAvatar };
