import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

type ButtonSize = 'large';
type ButtonBgColor = 'transparent' | 'dark' | 'primary';
type OtherProps = {
	withBorder?: boolean;
	size?: ButtonSize;
	color?: ButtonBgColor;
};
type ButtonBaseProps = FC<
	PropsWithChildren<HTMLAttributes<HTMLButtonElement> & OtherProps>
>;

export { type ButtonBaseProps };
