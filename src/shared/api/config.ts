const SERVICE_URLS = {
	identity: 'http://localhost:5001',
	users: import.meta.env.VITE_USERS_URL || 'http://localhost:5002',
	listings: import.meta.env.VITE_LISTINGS_URL || 'http://localhost:5003',
} as const;

export { SERVICE_URLS };
