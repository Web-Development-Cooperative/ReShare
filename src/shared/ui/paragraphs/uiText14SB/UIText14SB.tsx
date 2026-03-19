import { clsx } from 'clsx';

import styles from './UIText14SB.module.css';
import type { ParagraphProps } from '~~>shared/model/paragraph.types';

const UIText14SB: ParagraphProps = ({ className, children, ...props }) => {
	return (
		<p className={clsx(styles.paragraph, className)} {...props}>
			{children}
		</p>
	);
};

export { UIText14SB };
