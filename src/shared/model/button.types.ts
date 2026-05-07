import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

type ButtonSize = 'large';
type ButtonBgColor =
	| 'transparent'
	| 'filled'
	| 'shaded'
	| 'brand'
	| 'outline'
	| 'destructive';
type ButtonStateStyle = 'default' | 'error';
type OtherProps = {
	disabled?: boolean;
	withBorder?: boolean;
	size?: ButtonSize;
	color?: ButtonBgColor;
	stateStyle?: ButtonStateStyle;
};
type ButtonBaseProps = FC<
	PropsWithChildren<HTMLAttributes<HTMLButtonElement> & OtherProps>
>;

export { type ButtonBaseProps };
