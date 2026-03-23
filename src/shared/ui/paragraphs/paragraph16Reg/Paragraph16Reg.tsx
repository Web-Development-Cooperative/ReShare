import { clsx } from 'clsx';

import styles from './Paragraph16Reg.module.css';

import type { ParagraphProps } from '@shared/model/paragraph.types';

const Paragraph16Reg: ParagraphProps = ({ className, children, ...props }) => {
	return (
		<p className={clsx(styles.paragraph, className)} {...props}>
			{children}
		</p>
	);
};

export { Paragraph16Reg };
