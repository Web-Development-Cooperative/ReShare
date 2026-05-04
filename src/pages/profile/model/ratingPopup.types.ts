import type { FC } from 'react';

type OtherRatingPopupProps = {
	rating: number;
	countItems: number;
	reviewCount: number;
};
type RatingPopupProps = FC<OtherRatingPopupProps>;

export type { RatingPopupProps };
