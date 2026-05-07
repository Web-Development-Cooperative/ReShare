import baseAvatarMale from '@shared/assets/img/baseAvatarMale.png';

import type { StatCard, LeaderEntry } from './leaderboardPage.types';

const statCards: StatCard[] = [
	{
		id: 'total-items',
		icon: 'box',
		title: 'Всего отданных вещей',
		subtitle: 'По состоянию на апрель 2026',
		value: '12,847',
		trend: '+12.4% в этом месяце',
		trendPositive: true,
	},
	{
		id: 'active-users',
		icon: 'users',
		title: 'Активные участники',
		subtitle: 'По состоянию на апрель 2026',
		value: '9,575',
		trend: '+12.4% в этом месяце',
		trendPositive: true,
	},
	{
		id: 'landfill-saved',
		icon: 'turnover',
		title: 'Не попало на свалку',
		subtitle: 'По состоянию на апрель 2026',
		value: '12 тонн вещей',
		trend: '+12.4% в этом месяце',
		trendPositive: true,
	},
	{
		id: 'co2-saved',
		icon: 'leaves',
		title: 'Не попало в атмосферу',
		subtitle: 'По состоянию на апрель 2026',
		value: '45 тонн CO₂',
		trend: 'Эквивалент 1000 деревьев в год',
		trendPositive: true,
	},
	{
		id: 'avg-transfer-time',
		icon: 'handshake',
		title: 'Среднее время передачи',
		subtitle: 'От донора к получателю',
		value: '2.4 дня',
		trend: '-15% в этом месяце',
		trendPositive: false,
	},
	{
		id: 'ngo-donated',
		icon: 'team',
		title: 'Пожертвовано для НКО',
		subtitle: 'От донора к получателю',
		value: '13,500 вещей',
		trend: '+15% в этом месяце',
		trendPositive: true,
	},
	{
		id: 'total-orgs',
		icon: 'garage',
		title: 'Всего организаций',
		subtitle: 'Зарегистрировано в сервисе',
		value: '46',
		trend: '+4 за последний месяц',
		trendPositive: true,
	},
	{
		id: 'popular-category',
		icon: 'hanger',
		title: 'Популярная категория',
		subtitle: 'Среди всех остальных',
		value: 'Одежда',
		trend: 'на 8% популярнее',
		trendPositive: true,
	},
];

const leaderboard: LeaderEntry[] = [
	{
		id: 1,
		name: 'Аполлинария В.',
		avatarUrl: baseAvatarMale,
		itemsCount: 47,
		co2Saved: 123,
	},
	{
		id: 2,
		name: 'Patrick Green',
		avatarUrl: baseAvatarMale,
		itemsCount: 298,
		co2Saved: 123,
	},
	{
		id: 3,
		name: 'Patrick Green',
		avatarUrl: baseAvatarMale,
		itemsCount: 290,
		co2Saved: 123,
	},
	{
		id: 4,
		name: 'Patrick Green',
		avatarUrl: baseAvatarMale,
		itemsCount: 201,
		co2Saved: 123,
	},
	{
		id: 5,
		name: 'Patrick Green',
		avatarUrl: baseAvatarMale,
		itemsCount: 130,
		co2Saved: 123,
	},
	{
		id: 6,
		name: 'Patrick Green',
		avatarUrl: baseAvatarMale,
		itemsCount: 98,
		co2Saved: 123,
	},
	{
		id: 7,
		name: 'Patrick Green',
		avatarUrl: baseAvatarMale,
		itemsCount: 5,
		co2Saved: 123,
	},
];

export { statCards, leaderboard };
