import clsx from 'clsx';

import styles from './TextDivider.module.css';

import type { TextDividerProps } from '@shared/model/otherUI.types';

const TextDivider: TextDividerProps = ({
	label = 'Текст',
	position = 'middle',
	className,
	...props
}) => {
	return (
		<div className={clsx(styles.container, className)} {...props}>
			<div className={styles.divider} />
			<span className={clsx(styles.text, styles[position])}>{label}</span>
			<div className={styles.divider} />
		</div>
	);
};

export { TextDivider };
