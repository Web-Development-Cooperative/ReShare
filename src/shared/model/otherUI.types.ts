import type {
	FC,
	HtmlHTMLAttributes,
	ImgHTMLAttributes,
	PropsWithChildren,
} from 'react';

type TagColor = 'white' | 'green' | 'blue';
type OtherTagProps = { withBorder?: boolean; color?: TagColor };
type TagProps = FC<
	PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>> & OtherTagProps
>;

type AvatarSize =
	| 'huge'
	| 'extra large'
	| 'large'
	| 'medium'
	| 'small'
	| 'tiny';
type AvatarShape = 'square' | 'circle';
type OtherAvatarProps = { size: AvatarSize; shape: AvatarShape };
type AvatarProps = FC<
	PropsWithChildren<ImgHTMLAttributes<HTMLImageElement> & OtherAvatarProps>
>;

export { type TagProps, type AvatarProps };
