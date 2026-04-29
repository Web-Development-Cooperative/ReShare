import { baseApi, apiTags } from '@shared/api';

import type {
	AuthChangePasswordUpdateData,
	AuthLoginCreateData,
	AuthLogoutCreateData,
	AuthRefreshCreateData,
	AuthRegisterCreateData,
	ChangePasswordRequest,
	LoginUserCommand,
	RegisterUserCommand,
} from '@shared/api/generated/identity-api';

export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation<AuthRegisterCreateData, RegisterUserCommand>({
			query: (body) => ({
				url: '/auth/register',
				method: 'POST',
				body,
			}),
			invalidatesTags: [apiTags.Auth],
		}),
		login: builder.mutation<AuthLoginCreateData, LoginUserCommand>({
			query: (body) => {
				new Promise((resolve) => setTimeout(resolve, 2000));
				return {
					url: '/auth/login',
					method: 'POST',
					body,
				};
			},
			invalidatesTags: [apiTags.Auth, apiTags.User],
		}),
		refresh: builder.mutation<AuthRefreshCreateData, void>({
			query: () => ({
				url: '/auth/refresh',
				method: 'POST',
			}),
			invalidatesTags: [apiTags.Auth],
		}),
		logout: builder.mutation<AuthLogoutCreateData, void>({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
			}),
			invalidatesTags: [apiTags.Auth, apiTags.User],
		}),
		changePassword: builder.mutation<
			AuthChangePasswordUpdateData,
			ChangePasswordRequest
		>({
			query: (body) => ({
				url: '/auth/change-password',
				method: 'PUT',
				body,
			}),
			invalidatesTags: [apiTags.Auth],
		}),
	}),
});

export const {
	useRegisterMutation,
	useLoginMutation,
	useRefreshMutation,
	useLogoutMutation,
	useChangePasswordMutation,
} = authApi;
