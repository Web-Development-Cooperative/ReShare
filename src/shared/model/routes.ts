const ROUTES = {
	ADS: '/ads',
	LANDING: '/landing',
	LOGIN: '/login',
	HOME: '/',
	PROFILE: '/profile',
	PROFILE_MY_ADS: '/profile/my-ads',
	PROFILE_MY_APPLICATIONS: '/profile/my-applications',
	PROFILE_MY_ECO: '/profile/my-eco',
	PROFILE_MY_ARCHIVE: '/profile/my-archive',
} as const;

const ADAPTER_ROUTES_BREADCRUMBS = {
	'/landing': 'Лендинг',
	'/login': 'Вход',
	'/': 'Главная',
	'/profile': 'Профиль',
	'/profile/my-ads': 'Мои объявления',
	'/ads': 'Объявления',
	'/profile/my-applications': 'Мои заявки',
	'/profile/my-eco': 'Эковклад',
	'/profile/my-archive': 'Архив объявлений',
} as const;

export { ROUTES, ADAPTER_ROUTES_BREADCRUMBS };
