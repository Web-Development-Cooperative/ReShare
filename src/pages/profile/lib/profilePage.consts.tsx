import { Box, Leaves, Turnover } from '~~>shared/ui/icons';

import type { ReactNode } from 'react';
import type { SecondaryInfoCardType } from '~~>pages/profile/model/profilePage.types';

const MAX_RATING = 5;
const RATING = 3.7;
const LIST_INFO: Array<Record<'id', SecondaryInfoCardType>> = [
	{ id: 'box' },
	{ id: 'leaves' },
	{ id: 'turnover' },
];

const BASE_DATA: Record<SecondaryInfoCardType, Record<string, ReactNode>> = {
	box: { icon: <Box />, title: 'Совершено сделок' },
	leaves: { icon: <Leaves />, title: 'Не попало в атмосферу' },
	turnover: { icon: <Turnover />, title: 'Не попало на свалку' },
};

export { BASE_DATA, MAX_RATING, RATING, LIST_INFO };
