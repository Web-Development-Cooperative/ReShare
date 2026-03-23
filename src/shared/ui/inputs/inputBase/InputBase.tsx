import { clsx } from 'clsx';

import styles from './InputBase.module.css';

import type { FC } from 'react';
import type { BaseInputProps } from '@shared/model/input.types';

const InputBase: FC<BaseInputProps> = ({
	inputStyle = 'outline',
	leftIcon,
	rightIcon,
	className,
	...props
}) => {
	return (
		<div
			className={clsx(
				styles.inputContainer,
				styles[inputStyle],
				className
			)}
		>
			{leftIcon && leftIcon}
			<input
				className={styles['base-input']}
				type="text"
				name=""
				id=""
				{...props}
			/>
			{rightIcon && rightIcon}
		</div>
	);
};

export { InputBase };
