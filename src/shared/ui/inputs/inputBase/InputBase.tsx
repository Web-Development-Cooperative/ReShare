import { clsx } from 'clsx';

import { UIText12Reg, UIText14SB } from '@shared/ui/paragraphs';

import styles from './InputBase.module.css';

import type { FC } from 'react';
import type { BaseInputProps } from '@shared/model/input.types';

const InputBase: FC<BaseInputProps> = ({
	inputStyle = 'outline',
	stateStyle = 'default',
	textLabel,
	helper,
	leftIcon,
	rightIcon,
	className,
	disabled,
	...props
}) => {
	return (
		<div className={clsx(styles.inputWrapper, className)}>
			{textLabel && (
				<label>
					<UIText14SB>{textLabel}</UIText14SB>
				</label>
			)}
			<div
				className={clsx(
					styles.inputContainer,
					{ [styles.disabled]: disabled },
					styles[inputStyle],
					{ [styles[stateStyle]]: !disabled },
				)}
			>
				{leftIcon && leftIcon}
				<input
					className={styles['base-input']}
					disabled={disabled}
					{...props}
				/>
				{rightIcon && rightIcon}
			</div>
			{helper && (
				<UIText12Reg
					className={clsx(styles.helper, styles[stateStyle])}
				>
					{helper}
				</UIText12Reg>
			)}
		</div>
	);
};

export { InputBase };
