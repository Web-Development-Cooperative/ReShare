import { baseApi, apiTags } from '@shared/api';

import type {
	ChangePasswordRequest,
	LoginUserCommand,
	LogoutCommand,
	RefreshTokenCommand,
	RegisterUserCommand,
	TokensDto,
} from '@shared/api/generated/identity-api';

export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation<TokensDto, RegisterUserCommand>({
			query: (body) => ({
				url: '/auth/register',
				method: 'POST',
				body,
			}),
			invalidatesTags: [apiTags.Auth],
		}),
		login: builder.mutation<TokensDto, LoginUserCommand>({
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
		refresh: builder.mutation<TokensDto, RefreshTokenCommand>({
			query: (body) => ({
				url: '/auth/refresh',
				method: 'POST',
				body,
			}),
			invalidatesTags: [apiTags.Auth],
		}),
		logout: builder.mutation<void, LogoutCommand>({
			query: (body) => ({
				url: '/auth/logout',
				method: 'POST',
				body,
			}),
			invalidatesTags: [apiTags.Auth, apiTags.User],
		}),
		changePassword: builder.mutation<void, ChangePasswordRequest>({
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
