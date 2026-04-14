import clsx from 'clsx';

import { UIText14Reg, UIText12Reg } from '@shared/ui/paragraphs';

import styles from './Radio.module.css';

import type { FC } from 'react';
import type { RadioProps } from '@shared/model/input.types';

const Radio: FC<RadioProps> = ({
	className,
	size = 'lg',
	label,
	helper,
	labelPosition,
	error,
	...props
}) => {
	return (
		<label
			className={clsx(
				styles['radio-container'],
				styles[size],
				{
					[styles['label-left']]: labelPosition === 'left',
					[styles['label-right']]: labelPosition === 'right',
				},
				className,
			)}
		>
			<input
				type="radio"
				className={clsx(styles['radio-input'], styles[size], {
					[styles['radio-error']]: error,
				})}
				{...props}
			/>
			<span className={clsx(styles['radio-thumb'], styles[size])} />
			<div className={styles['label-helper']}>
				{label && (
					<UIText14Reg className={clsx(styles['radio-label'])}>
						{label}
					</UIText14Reg>
				)}
				{helper && (
					<UIText12Reg className={clsx(styles['radio-helper'])}>
						{helper}
					</UIText12Reg>
				)}
				{error && (
					<UIText12Reg className={clsx(styles['radio-error-text'])}>
						{error}
					</UIText12Reg>
				)}
			</div>
		</label>
	);
};

export { Radio };
