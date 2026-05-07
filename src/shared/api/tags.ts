/**
 * RTK Query Tags для кеширования и инвалидации данных
 */
export const apiTags = {
	// Аутентификация
	Auth: 'Auth',
	// Пользователи
	User: 'User',
	Profile: 'Profile',
	// Сообщения
	Messages: 'Messages',
	// Посты
	Posts: 'Posts',
	Comments: 'Comments',
	// Уведомления
	Notifications: 'Notifications',
	// Объявления
	Listings: 'Listings',
	// Рейтинг
	Leaderboard: 'Leaderboard',
	// Файлы
	Files: 'Files',
} as const;
