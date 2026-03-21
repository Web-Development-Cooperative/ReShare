const ROUTES = {
	ADS: '/ads',
	LANDING: '/landing',
	LOGIN: '/login',
	HOME: '/',
	PROFILE: '/profile',
	PROFILE_MY_ADS: '/profile/my-ads',
} as const;

const ADAPTER_ROUTES_BREADCRUMBS = {
	'/landing': 'Лендинг',
	'/login': 'Вход',
	'/': 'Главная',
	'/profile': 'Профиль',
	'/profile/my-ads': 'Мои объявления',
	'/ads': 'Объявления'
} as const;

export { ROUTES, ADAPTER_ROUTES_BREADCRUMBS };
