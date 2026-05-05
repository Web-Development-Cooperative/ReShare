const ROUTES = {
	ADS: '/ads',
	AD: '/ads/:adId',
	LANDING: '/landing',
	LOGIN: '/login',
	REG: '/reg',
	HOME: '/',
	PROFILE: '/profile',
	PROFILE_MY_ADS: '/profile/my-ads',
	PROFILE_MY_AD: '/profile/my-ads/:adId',
	PROFILE_MY_APPLICATIONS: '/profile/my-applications',
	PROFILE_MY_ECO: '/profile/my-eco',
	PROFILE_MY_ARCHIVE: '/profile/my-archive',
	MESSAGES: '/messages',
	CHAT: '/messages/:chatId',
	NEW_PUBLICATION: '/new-publication',
} as const;

const ADAPTER_ROUTES_BREADCRUMBS = {
	'/landing': 'Лендинг',
	'/login': 'Вход',
	'/reg': 'Регистрация',
	'/': 'Главная',
	'/profile': 'Профиль',
	'/ads': 'Объявления',
	'/ads/:adId': 'Объявление',
	'/profile/my-ads': 'Мои объявления',
	'/profile/my-ads/:adId': 'Моё объявление',
	'/profile/my-applications': 'Мои заявки',
	'/profile/my-eco': 'Эковклад',
	'/profile/my-archive': 'Архив объявлений',
	'/messages': 'Сообщения',
	'/messages/:chatId': 'Чат',
	'/new-publication': 'Новая публикация',
} as const;

export { ROUTES, ADAPTER_ROUTES_BREADCRUMBS };
