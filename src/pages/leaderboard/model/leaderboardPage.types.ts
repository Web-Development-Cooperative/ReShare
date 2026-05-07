type StatCard = {
	id: string;
	icon:
		| 'box'
		| 'users'
		| 'turnover'
		| 'leaves'
		| 'handshake'
		| 'team'
		| 'garage'
		| 'hanger';
	title: string;
	subtitle: string;
	value: string;
	trend: string;
	trendPositive: boolean;
};

type LeaderEntry = {
	id: number;
	name: string;
	avatarUrl: string;
	itemsCount: number;
	co2Saved: number;
};

export type { StatCard, LeaderEntry };
