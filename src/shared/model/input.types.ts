import type { InputHTMLAttributes, ReactNode, RefAttributes } from 'react';

type BaseInputProps = InputHTMLAttributes<HTMLInputElement> &
	RefAttributes<HTMLInputElement> & {
		textLabel?: string;
		helper?: string;
		leftIcon?: ReactNode;
		rightIcon?: ReactNode;
		inputStyle?: 'outline' | 'shaded';
	};

export type { BaseInputProps };
