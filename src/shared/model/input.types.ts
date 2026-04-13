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

type ToggleProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'size' | 'error' | 'label' | 'labelPosition'
> &
	RefAttributes<HTMLInputElement> & {
		size?: 'lg' | 'md';
		error?: boolean;
		label?: string;
		labelPosition?: 'left' | 'right';
	};
type RadioProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'size' | 'error' | 'label' | 'helper' | 'labelPosition'
> &
	RefAttributes<HTMLInputElement> & {
		size?: 'lg' | 'md';
		error?: boolean;
		label?: string;
		helper?: string;
		labelPosition?: 'left' | 'right';
	};

export type { BaseInputProps, TextareaBaseProps, ToggleProps, RadioProps };
