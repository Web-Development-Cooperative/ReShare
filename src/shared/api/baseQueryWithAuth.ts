import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryMeta,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
// const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const baseQueryWithoutAuth = fetchBaseQuery({
	baseUrl: '',
	credentials: 'include',
	prepareHeaders: (headers) => {
		headers.set('Content-Type', 'application/json');

		// Получаем токен из localStorage
		const token = localStorage.getItem('authToken');
		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}

		return headers;
	},
});

export const baseQueryWithAuth: BaseQueryFn<
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

		if (refreshResult.data) {
			// Сохраняем новый токен
			const newToken = (refreshResult.data as { token?: string }).token;
			if (newToken) {
				localStorage.setItem('authToken', newToken);
			}

			// Повторяем оригинальный запрос с новым токеном
			result = await baseQueryWithoutAuth(args, api, extraOptions);
		} else {
			// Если обновление не удалось, выходим из системы
			localStorage.removeItem('authToken');
			// Здесь можно добавить редирект на страницу входа
		}
	}

	return result;
};
