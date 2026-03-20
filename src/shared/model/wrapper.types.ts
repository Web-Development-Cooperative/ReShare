import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

type BgColor = 'white' | 'suface-1';
type ColorProps = { colorType: BgColor };
type BgBorderDefaultProps = FC<PropsWithChildren<ColorProps>>;

type OtherPaddingWrapperProps = { x: number; y: number };
type PaddingWrapperProps = FC<
	HTMLAttributes<HTMLDivElement> & OtherPaddingWrapperProps
>;

export { type BgBorderDefaultProps, type PaddingWrapperProps };
