import type { FC, SVGProps } from 'react';

type SVGIcon = FC<SVGProps<SVGSVGElement>>;

type StarSize = 'large' | 'medium' | 'small';
type OtherSVGIconStar = { size?: StarSize };
type SVGIconStar = FC<SVGProps<SVGSVGElement> & OtherSVGIconStar>;

export { type SVGIcon, type SVGIconStar };
