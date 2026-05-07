import { useMemo } from 'react';

import { useGetEcoStatsQuery } from '@entities/analytics';

import { statCards, leaderboard } from '../model/leaderboardPage.consts';

const useLeaderboardPage = () => {
	const { data: ecoStats, isLoading, isError } = useGetEcoStatsQuery();

	const cards = useMemo(() => {
		if (!ecoStats) return statCards;

		return statCards.map((card) => {
			switch (card.id) {
				case 'total-items':
					return {
						...card,
						value: ecoStats.totalItemsTransferred.toString()
					};
				case 'active-users':
					return {
						...card,
						value: ecoStats.registeredUsers.toString(),
					};
				case 'landfill-saved':
					return {
						...card,
						value: `${(ecoStats.totalWasteSavedKg / 1000).toFixed(2)} тонн вещей`,
					};
				case 'co2-saved':
					return {
						...card,
						value: `${(ecoStats.totalCo2SavedKg / 1000).toFixed(2)} тонн CO₂`,
					};
				default:
					return card;
			}
		});
	}, [ecoStats]);

	return {
		cards,
		leaderboard,
		isLoading,
		isError,
	};
};

export { useLeaderboardPage };
