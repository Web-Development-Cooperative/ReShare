import styles from './InputBase.module.css';
import type { FC } from 'react';
import type { BaseInputProps } from '~~>shared/model/input.types';

const InputBase: FC<BaseInputProps> = ({ leftIcon, rightIcon, ...props }) => {
	return (
		<div className={styles.inputContainer}>
			{leftIcon && leftIcon}
			<input type="text" name="" id="" {...props} />
			{rightIcon && rightIcon}
		</div>
	);
};

export default InputBase;
