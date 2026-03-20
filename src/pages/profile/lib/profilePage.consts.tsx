import { Box, Leaves, Turnover } from '~~>shared/ui/icons';
import { ADAPTER_ROUTES_BREADCRUMBS, ROUTES } from '~~>shared/model/routes';

import type { ReactNode } from 'react';
import type { SecondaryInfoCardType } from '~~>pages/profile/model/profilePage.types';

const MAX_RATING = 5;
const RATING = 3.7;
const LIST_INFO: Array<Record<'id', SecondaryInfoCardType>> = [
	{ id: 'box' },
	{ id: 'leaves' },
	{ id: 'turnover' },
];
const NAV = [
	{
		id: 1,
		text: ADAPTER_ROUTES_BREADCRUMBS['/profile/my-ads'],
		to: ROUTES.PROFILE_MY_ADS,
	},
	{
		id: 2,
		text: ADAPTER_ROUTES_BREADCRUMBS['/profile/my-applications'],
		to: ROUTES.PROFILE_MY_APPLICATIONS,
	},
	{
		id: 3,
		text: ADAPTER_ROUTES_BREADCRUMBS['/profile/my-eco'],
		to: ROUTES.PROFILE_MY_ECO,
	},
	{
		id: 4,
		text: ADAPTER_ROUTES_BREADCRUMBS['/profile/my-archive'],
		to: ROUTES.PROFILE_MY_ARCHIVE,
	},
];

const BASE_DATA: Record<SecondaryInfoCardType, Record<string, ReactNode>> = {
	box: { icon: <Box />, title: 'Совершено сделок' },
	leaves: { icon: <Leaves />, title: 'Не попало в атмосферу' },
	turnover: { icon: <Turnover />, title: 'Не попало на свалку' },
};

export { BASE_DATA, MAX_RATING, RATING, LIST_INFO, NAV };
