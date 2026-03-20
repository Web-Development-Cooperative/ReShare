import { clsx } from 'clsx';

import styles from './Avatar.module.css';
import type { AvatarProps } from '~~>shared/model/otherUI.types';

const Avatar: AvatarProps = ({ src, alt, size, shape, ...props }) => {
	return (
		<div className={clsx(styles.avatar, styles[shape], styles[size])}>
			<img src={src} alt={alt} {...props} />
		</div>
	);
};

export { Avatar };
