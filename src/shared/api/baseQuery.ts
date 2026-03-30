import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const BASE_URL =
	import.meta.env.VITE_GATEWAY_URL || 'http://localhost:8080/api';

export const baseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
	credentials: 'include',
	prepareHeaders: (headers) => {
		headers.set('Content-Type', 'application/json');
		return headers;
	},
});
