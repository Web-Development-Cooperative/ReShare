import { baseApi, apiTags } from '@shared/api';

import type {
	UserProfileDto,
	UpdateProfileRequest,
	UpdateAvatarRequest,
	UsersReviewsListParams,
	UsersReviewsListData,
	AddReviewRequest,
	UsersReviewsCreateData,
	UsersLeaderboardListParams,
	UsersLeaderboardListData,
} from '@shared/api/generated/users-api';

export const usersApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// Профиль пользователя
		getUserProfile: builder.query<UserProfileDto, string>({
			query: (id) => ({
				url: `/users/${id}`,
				method: 'GET',
			}),
			providesTags: [apiTags.User],
		}),

		// Мой профиль
		getMyProfile: builder.query<UserProfileDto, void>({
			query: () => ({
				url: '/users/me',
				method: 'GET',
			}),
			providesTags: [apiTags.User],
		}),

		// Обновление моего профиля
		updateMyProfile: builder.mutation<void, UpdateProfileRequest>({
			query: (data) => ({
				url: '/users/me',
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: [apiTags.Listings, apiTags.User],
		}),

		// Обновление аватара
		updateMyAvatar: builder.mutation<void, UpdateAvatarRequest>({
			query: (data) => ({
				url: '/users/me/avatar',
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: [apiTags.Listings, apiTags.User],
		}),

		// Отзывы пользователя
		getUserReviews: builder.query<
			UsersReviewsListData,
			UsersReviewsListParams
		>({
			query: ({ id, ...params }) => ({
				url: `/users/${id}/reviews`,
				method: 'GET',
				params,
			}),
			providesTags: [apiTags.User],
		}),

		// Добавить отзыв
		addUserReview: builder.mutation<
			UsersReviewsCreateData,
			{ id: string; review: AddReviewRequest }
		>({
			query: ({ id, review }) => ({
				url: `/users/${id}/reviews`,
				method: 'POST',
				body: review,
			}),
			invalidatesTags: [apiTags.Listings, apiTags.User],
		}),

		// Лидерборд пользователей
		getLeaderboard: builder.query<
			UsersLeaderboardListData,
			UsersLeaderboardListParams
		>({
			query: (params) => ({
				url: '/users/leaderboard',
				method: 'GET',
				params,
			}),
			providesTags: [apiTags.Leaderboard],
		}),
	}),
});

export const {
	useGetUserProfileQuery,
	useGetMyProfileQuery,
	useUpdateMyProfileMutation,
	useUpdateMyAvatarMutation,
	useGetUserReviewsQuery,
	useAddUserReviewMutation,
	useGetLeaderboardQuery,
} = usersApi;
