import { clsx } from 'clsx';

import { StatusDot } from '@shared/ui/icons';
import fallbackImage from '@shared/assets/img/baseAvatarMale.png';

import styles from './Avatar.module.css';
import { useAvatar } from './lib/useAvatar';

import type { AvatarProps } from '@shared/model/otherUI.types';

const Avatar: AvatarProps = ({
	src,
	alt,
	size,
	shape,
	statusDot = false,
	onError,
	...props
}) => {
	const { imgSrc, handleError } = useAvatar(src);

	return (
		<div className={clsx(styles.avatar, styles[shape], styles[size])}>
			<img
				src={imgSrc ?? fallbackImage}
				alt={alt}
				onError={onError || handleError}
				{...props}
			/>
			{statusDot && <StatusDot className={styles['status-dot']} />}
		</div>
	);
};

export { Avatar };
