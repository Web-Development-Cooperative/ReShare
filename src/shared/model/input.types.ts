import type { InputHTMLAttributes, ReactNode, RefAttributes } from 'react';

type BaseInputProps = InputHTMLAttributes<HTMLInputElement> &
	RefAttributes<HTMLInputElement> & {
		leftIcon?: ReactNode;
		rightIcon?: ReactNode;
		inputStyle?: 'outline' | 'shaded';
	};

export type { BaseInputProps };
