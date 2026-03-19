import { clsx } from 'clsx';

import styles from './BgBorderDefault.module.css';
import type { BgBorderDefaultProps } from '~~>shared/model/wrapper.types';

const BgBorderDefault: BgBorderDefaultProps = ({ colorType, children }) => {
	return (
		<div className={clsx(styles['bg-border'], styles[colorType])}>
			{children}
		</div>
	);
};

export { BgBorderDefault };
