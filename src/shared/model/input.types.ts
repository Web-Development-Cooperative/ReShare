import type { InputHTMLAttributes, ReactNode, RefAttributes } from 'react';

type BaseInputProps = InputHTMLAttributes<HTMLInputElement> &
	RefAttributes<HTMLInputElement> & {
		textLabel?: string;
		helper?: string;
		leftIcon?: ReactNode;
		rightIcon?: ReactNode;
		inputStyle?: 'outline' | 'shaded';
		stateStyle?: 'default' | 'error';
	};

type TextareaBaseProps = InputHTMLAttributes<HTMLTextAreaElement> &
	RefAttributes<HTMLTextAreaElement> & {
		textLabel?: string;
		helper?: string;
		inputStyle?: 'outline' | 'shaded';
		stateStyle?: 'default' | 'error';
	};

export type { BaseInputProps, TextareaBaseProps };
