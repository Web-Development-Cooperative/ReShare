import type {
	FC,
	HTMLAttributes,
	HtmlHTMLAttributes,
	ImgHTMLAttributes,
	PropsWithChildren,
	ReactNode,
	RefAttributes,
} from 'react';

type TagColor =
	| 'white'
	| 'green'
	| 'blue'
	| 'red'
	| 'yellow'
	| 'purple'
	| 'teal'
	| 'black';
type TagSize = 'large' | 'medium' | 'small';
type TagStyle = 'subtle' | 'filled' | 'outline';
type OtherTagProps = {
	withBorder?: boolean;
	color?: TagColor;
	size?: TagSize;
	tagStyle?: TagStyle;
};
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
type OtherAvatarProps = {
	size: AvatarSize;
	shape: AvatarShape;
	statusDot?: boolean;
};
type AvatarProps = FC<
	PropsWithChildren<ImgHTMLAttributes<HTMLImageElement> & OtherAvatarProps>
>;

type UniListProps<T> = HTMLAttributes<HTMLUListElement> &
	RefAttributes<HTMLUListElement> & {
		items: T[];
		renderItem: (_item: T, _index: number) => ReactNode;
	};

type RatingSize = 'large' | 'medium' | 'small';
type OtherRatingProps = {
	left?: boolean;
	size?: RatingSize;
	right?: boolean;
	rating: number;
};
type RatingProps = FC<
	PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>> & OtherRatingProps
>;

export { type TagProps, type AvatarProps, type UniListProps, type RatingProps };
