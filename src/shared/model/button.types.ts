import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

type ButtonSize = 'large';
type ButtonBgColor = 'transparent' | 'dark' | 'shaded' | 'brand' | 'outline';
type ButtonStateStyle = 'default' | 'error';
type OtherProps = {
	withBorder?: boolean;
	size?: ButtonSize;
	color?: ButtonBgColor;
	stateStyle?: ButtonStateStyle;
};
type ButtonBaseProps = FC<
	PropsWithChildren<HTMLAttributes<HTMLButtonElement> & OtherProps>
>;

export { type ButtonBaseProps };
