import clsx from 'clsx';

import { UIText12Reg, UIText14SB } from '@shared/ui/paragraphs';

import styles from './TextareaBase.module.css';

import type { FC } from 'react';
import type { TextareaBaseProps } from '@shared/model/input.types';

const TextareaBase: FC<TextareaBaseProps> = ({
	className,
	textLabel,
	helper,
	inputStyle = 'outline',
	stateStyle = 'default',
	...props
}) => {
	return (
		<div className={clsx(styles.inputWrapper, className)}>
			{textLabel && (
				<label>
					<UIText14SB>{textLabel}</UIText14SB>
				</label>
			)}
			<textarea
				className={clsx(
					styles['base-input'],
					styles[inputStyle],
					styles[stateStyle],
				)}
				{...props}
			/>
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

export { TextareaBase };
