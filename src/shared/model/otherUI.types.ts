import type {
	LoginUserCommand,
	RegisterUserCommand,
} from '@shared/api/generated/identity-api';
import type {
	ButtonHTMLAttributes,
	FC,
	HTMLAttributes,
	HtmlHTMLAttributes,
	ImgHTMLAttributes,
	InputHTMLAttributes,
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

type OtherTextDividerProps = {
	label?: string;
	position?: 'left' | 'middle' | 'right';
};
type TextDividerProps = FC<
	PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>> &
		OtherTextDividerProps
>;

type OtherAuthFormProps = {
	typeForm: 'login' | 'reg';
	value: RegisterUserCommand & LoginUserCommand;
	onSubmit: Pick<
		ButtonHTMLAttributes<HTMLButtonElement>,
		'onClick'
	>['onClick'];
	isLoading?: boolean;
	error?: string | null;
};
type AuthFormProps = FC<
	Omit<HtmlHTMLAttributes<HTMLDivElement>, 'onChange' | 'onSubmit'> &
		OtherAuthFormProps &
		Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange'>
>;

type StepsHorizontalProps = FC<{
	steps: number;
	currentStep: number;
}>;

type AllAdCardProps = {
	state?: 'default' | 'disabled';
	img: string | File;
	title: string;
	author: string;
	description: string;
	tags: ({ id: string | number } & Record<string, string | number>)[];
};
type IAdCard = FC<AllAdCardProps>;

export {
	type TagProps,
	type AvatarProps,
	type UniListProps,
	type RatingProps,
	type TextDividerProps,
	type AuthFormProps,
	type StepsHorizontalProps,
	type IAdCard,
};
