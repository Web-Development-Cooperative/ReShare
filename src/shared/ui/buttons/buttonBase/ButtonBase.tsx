import { clsx } from 'clsx';

import styles from './ButtonBase.module.css';

import type { ButtonBaseProps } from '@shared/model/button.types';

const ButtonBase: ButtonBaseProps = ({
	className,
	children,
	size = 'large',
	withBorder = false,
	color = 'transparent',
	stateStyle = 'default',
	disabled = false,
	...props
}) => {
	return (
		<button
			className={clsx(
				styles.button,
				styles[size],
				styles[color],
				styles[stateStyle],
				{ [styles.border]: withBorder },
				className,
			)}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
};

export { ButtonBase };
