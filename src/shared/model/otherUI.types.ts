import type { FC, HtmlHTMLAttributes, PropsWithChildren } from 'react';

type TagColor = 'white' | 'green' | 'blue';
type OtherTagProps = { withBorder?: boolean; color?: TagColor };
type TagProps = FC<
	PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>> & OtherTagProps
>;

export { type TagProps };
