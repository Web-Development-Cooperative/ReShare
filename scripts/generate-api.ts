import path from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
import { generateApi } from 'swagger-typescript-api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.development') });

const BASE_URL_PREFIX = process.env.VITE_BASE_URL_PREFIX || 'http://localhost:';
const SWAGGER_SUFFIX =
	process.env.VITE_SWAGGER_SUFFIX || '/swagger/v1/swagger.json';

const services = [
	{
		name: 'identity-api',
		port: process.env.VITE_IDENTITY_SERVICE_PORT || '5001',
		output: 'identity-api.ts',
	},
	{
		name: 'users-api',
		port: process.env.VITE_USERS_SERVICE_PORT || '5002',
		output: 'users-api.ts',
	},
	{
		name: 'listings-api',
		port: process.env.VITE_LISTINGS_SERVICE_PORT || '5003',
		output: 'listings-api.ts',
	},
	{
		name: 'transactions-api',
		port: process.env.VITE_TRANSACTIONS_SERVICE_PORT || '5004',
		output: 'transactions-api.ts',
	},
	{
		name: 'messaging-api',
		port: process.env.VITE_MESSAGING_SERVICE_PORT || '5005',
		output: 'messaging-api.ts',
	},
	{
		name: 'notifications-api',
		port: process.env.VITE_NOTIFICATIONS_SERVICE_PORT || '5006',
		output: 'notifications-api.ts',
	},
	{
		name: 'charity-api',
		port: process.env.VITE_CHARITY_SERVICE_PORT || '5007',
		output: 'charity-api.ts',
	},
	{
		name: 'disputes-api',
		port: process.env.VITE_DISPUTES_SERVICE_PORT || '5008',
		output: 'disputes-api.ts',
	},
	{
		name: 'files-api',
		port: process.env.VITE_FILES_SERVICE_PORT || '5009',
		output: 'files-api.ts',
	},
	{
		name: 'analytics-api',
		port: process.env.VITE_ANALYTICS_SERVICE_PORT || '5010',
		output: 'analytics-api.ts',
	},
];

const generate = async () => {
	for (const service of services) {
		console.log(`Generating ${service.name}...`);
		try {
			await generateApi({
				fileName: service.output,
				url: `${BASE_URL_PREFIX}${service.port}${SWAGGER_SUFFIX}`,
				output: path.resolve(__dirname, '../src/shared/api/generated'),
				generateClient: true,
				extractRequestParams: true,
				extractResponseBody: true,
				// Важно: уникальные имена, чтобы типы не конфликтовали
				moduleNameFirstTag: false,
			});
			console.log(`✅ ${service.name} generated`);
		} catch (e) {
			console.error(`❌ Failed ${service.name}:`, e);
		}
	}
};

generate();
