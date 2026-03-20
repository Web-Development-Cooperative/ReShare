import { clsx } from 'clsx';

import styles from './ButtonBase.module.css';
import type { ButtonBaseProps } from '~~>shared/model/button.types';

const ButtonBase: ButtonBaseProps = ({
	className,
	children,
	size = 'large',
	withBorder = false,
	color = 'transparent',
	...props
}) => {
	return (
		<button
			className={clsx(
				styles.button,
				styles[size],
				styles[color],
				{ [styles.border]: withBorder },
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
};

export { ButtonBase };
