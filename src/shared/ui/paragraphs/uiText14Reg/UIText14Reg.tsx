import { clsx } from 'clsx';

import styles from './UIText14Reg.module.css';
import type { ParagraphProps } from '~~>shared/model/paragraph.types';

const UIText14Reg: ParagraphProps = ({ className, children, ...props }) => {
	return (
		<p className={clsx(className, styles.paragraph)} {...props}>
			{children}
		</p>
	);
};

export { UIText14Reg };
