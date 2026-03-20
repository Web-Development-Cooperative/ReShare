import type {
	FC,
	HTMLAttributes,
	HtmlHTMLAttributes,
	ImgHTMLAttributes,
	PropsWithChildren,
	ReactNode,
	RefAttributes,
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

type UniListProps<T> = HTMLAttributes<HTMLUListElement> &
	RefAttributes<HTMLUListElement> & {
		items: T[];
		renderItem: (_item: T, _index: number) => ReactNode;
	};

export { type TagProps, type AvatarProps, type UniListProps };
