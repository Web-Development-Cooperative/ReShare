import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryMeta,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

const BASE_URL =
	import.meta.env.VITE_GATEWAY_URL || 'http://localhost:8080/api';

const getCookieValue = (cookieName: string): string | null => {
	const escapedName = cookieName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const match = document.cookie.match(
		new RegExp(`(?:^|; )${escapedName}=([^;]*)`),
	);

	if (!match) {
		return null;
	}

	return decodeURIComponent(match[1]);
};

const baseQueryWithoutAuth = fetchBaseQuery({
	baseUrl: BASE_URL,
	credentials: 'include',
	prepareHeaders: (headers) => {
		headers.set('Content-Type', 'application/json');

		// Получаем токен из cookies
		const token = getCookieValue('accessToken');
		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}

		return headers;
	},
});

const baseQueryWithAuth: BaseQueryFn<
	FetchArgs | string,
	unknown,
	FetchBaseQueryError,
	object,
	FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
	let result = await baseQueryWithoutAuth(args, api, extraOptions);

	// Если получили ошибку 401 (Unauthorized), пытаемся обновить токен
	if (result.error && result.error.status === 401) {
		const refreshResult = await baseQueryWithoutAuth(
			{
				url: '/auth/refresh',
				method: 'POST',
			},
			api,
			extraOptions,
		);

		if (refreshResult.meta?.response?.status === 204) {
			// Повторяем оригинальный запрос с новым токеном
			result = await baseQueryWithoutAuth(args, api, extraOptions);
		} else {
			console.warn('Refresh token failed, logging out');
			window.location.href = '/login';
		}
	}

	return result;
};

export { getCookieValue, baseQueryWithAuth };
