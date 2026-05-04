import type { FC, HtmlHTMLAttributes } from 'react';

type Metric = {
	id: string;
	data: number | string;
	title: string;
	description: string;
};
type OtherSecondaryInfoCardProps = { metric: Metric };
type SecondaryInfoCardProps = FC<
	HtmlHTMLAttributes<HTMLDivElement> & OtherSecondaryInfoCardProps
>;

export { type SecondaryInfoCardProps, type Metric };
