import type { FC, HtmlHTMLAttributes } from 'react';

type SecondaryInfoCardType = 'box' | 'leaves' | 'turnover';
type OtherSecondaryInfoCardProps = { typeCard: SecondaryInfoCardType };
type SecondaryInfoCardProps = FC<
	HtmlHTMLAttributes<HTMLDivElement> & OtherSecondaryInfoCardProps
>;

export { type SecondaryInfoCardProps, type SecondaryInfoCardType };
