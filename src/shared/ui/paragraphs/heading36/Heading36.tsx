import { clsx } from 'clsx';

import styles from './heading36.module.css';

import type { ParagraphProps } from '@shared/model/paragraph.types';

const Heading36: ParagraphProps = ({ className, children, ...props }) => {
	return (
		<p className={clsx(styles.paragraph, className)} {...props}>
			{children}
		</p>
	);
};

export { Heading36 };
