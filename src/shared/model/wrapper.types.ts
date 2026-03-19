import type { FC, PropsWithChildren } from 'react';

type BgColor = 'white' | 'suface-1';
type ColorProps = { colorType: BgColor };
type BgBorderDefaultProps = FC<PropsWithChildren<ColorProps>>;

export { type BgBorderDefaultProps };
