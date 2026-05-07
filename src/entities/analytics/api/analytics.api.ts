import { baseApi, apiTags } from '@shared/api';

import type {
	AnalyticsEcoStatsListData,
	AnalyticsCategoriesListData,
	AnalyticsCitiesListData,
} from '@shared/api/generated/analytics-api';

export const analyticsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// Экологическая статистика платформы
		getEcoStats: builder.query<AnalyticsEcoStatsListData, void>({
			query: () => ({
				url: '/Analytics/eco-stats',
				method: 'GET',
			}),
			providesTags: [apiTags.Leaderboard],
		}),

		// Статистика по категориям
		getCategoryStats: builder.query<AnalyticsCategoriesListData, void>({
			query: () => ({
				url: '/Analytics/categories',
				method: 'GET',
			}),
			providesTags: [apiTags.Leaderboard],
		}),

		// Статистика по городам
		getCityStats: builder.query<AnalyticsCitiesListData, void>({
			query: () => ({
				url: '/Analytics/cities',
				method: 'GET',
			}),
			providesTags: [apiTags.Leaderboard],
		}),
	}),
});

export const {
	useGetEcoStatsQuery,
	useGetCategoryStatsQuery,
	useGetCityStatsQuery,
} = analyticsApi;
