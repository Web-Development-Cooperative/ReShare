import { ADAPTER_ROUTES_BREADCRUMBS, ROUTES } from '@shared/model/routes';

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
	// {
	// 	id: 3,
	// 	text: ADAPTER_ROUTES_BREADCRUMBS['/profile/my-eco'],
	// 	to: ROUTES.PROFILE_MY_ECO,
	// },
	{
		id: 4,
		text: ADAPTER_ROUTES_BREADCRUMBS['/profile/my-archive'],
		to: ROUTES.PROFILE_MY_ARCHIVE,
	},
];

const PHONES = [
	{
		id: 1,
		phone: '+7 800 555-35-35',
		status: false,
	},
	{
		id: 1,
		phone: '+7 800 555-35-35',
		status: true,
	},
];

export { NAV, PHONES };
