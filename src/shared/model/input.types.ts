import type { ChangeEvent, InputHTMLAttributes, ReactNode, RefAttributes } from 'react';

type BaseInputProps = InputHTMLAttributes<HTMLInputElement> &
	RefAttributes<HTMLInputElement> & {
		textLabel?: string;
		helper?: string;
		leftIcon?: ReactNode;
		rightIcon?: ReactNode;
		inputStyle?: 'outline' | 'shaded';
		stateStyle?: 'default' | 'error' | 'success' | 'warning';
	};

type TextareaBaseProps = InputHTMLAttributes<HTMLTextAreaElement> &
	RefAttributes<HTMLTextAreaElement> & {
		textLabel?: string;
		helper?: string;
		inputStyle?: 'outline' | 'shaded';
		stateStyle?: 'default' | 'error' | 'success' | 'warning';
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

type InputDropZoneProps = InputHTMLAttributes<HTMLInputElement> &
	RefAttributes<HTMLInputElement> & {
		errors?: string;
		addPhoto: (e: ChangeEvent<HTMLInputElement, Element>) => void;
	};

export type {
	BaseInputProps,
	TextareaBaseProps,
	ToggleProps,
	RadioProps,
	InputDropZoneProps,
};
