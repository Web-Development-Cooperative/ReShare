const ROUTES = {
	LANDING: '/landing',
	LOGIN: '/login',
	HOME: '/',
} as const;

const ADAPTER_ROUTES_BREADCRUMBS = {
	'/landing': 'Лендинг',
	'/': 'Главная',
	'/login': 'Вход',
} as const;

export { ROUTES, ADAPTER_ROUTES_BREADCRUMBS };
