const ACCESS_TOKEN_COOKIE_NAME = 'accessToken';

const AUTH_API_BASE_URL =
	import.meta.env.VITE_GATEWAY_URL || 'http://localhost:8080/api';

export { ACCESS_TOKEN_COOKIE_NAME, AUTH_API_BASE_URL };
