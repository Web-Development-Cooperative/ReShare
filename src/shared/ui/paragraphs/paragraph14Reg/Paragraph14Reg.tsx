import { clsx } from 'clsx';

import styles from './Paragraph14Reg.module.css';
import type { ParagraphProps } from '@shared/model/paragraph.types';

const Paragraph14Reg: ParagraphProps = ({ className, children, ...props }) => {
	return (
		<p className={clsx(styles.paragraph, className)} {...props}>
			{children}
		</p>
	);
};

export { Paragraph14Reg };
