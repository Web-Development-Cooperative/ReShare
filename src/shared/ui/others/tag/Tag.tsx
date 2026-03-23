import { clsx } from 'clsx';

import styles from './Tag.module.css';
import type { TagProps } from '@shared/model/otherUI.types';

const Tag: TagProps = ({
	className,
	children,
	color = 'green',
	size = 'small',
	tagStyle = 'filled',
	withBorder = false,
	...props
}) => {
	return (
		<div
			className={clsx(
				styles.tag,
				styles[color],
				styles[tagStyle],
				styles[size],
				{
					[styles.border]: withBorder,
				},
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
};

export { Tag };
