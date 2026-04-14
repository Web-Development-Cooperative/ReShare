import clsx from 'clsx';

import { UIText14Reg } from '@shared/ui/paragraphs';

import styles from './Toggle.module.css';

import type { FC } from 'react';
import type { ToggleProps } from '@shared/model/input.types';

const Toggle: FC<ToggleProps> = ({
	size = 'lg',
	error = false,
	label,
	labelPosition = 'right',
	className,
	...props
}) => {
	return (
		<label
			className={clsx(
				styles['switch-container'],
				{
					[styles['label-left']]: labelPosition === 'left',
					[styles['label-right']]: labelPosition === 'right',
				},
				className,
			)}
		>
			<input
				type="checkbox"
				role="switch"
				className={clsx(styles['switch-input'], styles[size], {
					[styles['switch-error']]: error,
				})}
				{...props}
			/>
			<span
				className={clsx(styles['switch-track'], styles[size], {
					[styles['track-error']]: error,
				})}
			>
				<span className={clsx(styles['switch-thumb'], styles[size])} />
			</span>
			{label && (
				<UIText14Reg className={clsx(styles['switch-label'])}>
					{label}
				</UIText14Reg>
			)}
		</label>
	);
};

export { Toggle };
