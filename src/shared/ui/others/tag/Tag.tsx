import { clsx } from 'clsx';

import type { TagProps } from '~~>shared/model/otherUI.types';
import styles from './Tag.module.css';

const Tag: TagProps = ({
	className,
	children,
	color = 'green',
	withBorder = true,
	...props
}) => {
	return (
		<div
			className={clsx(
				styles.tag,
				styles[color],
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
