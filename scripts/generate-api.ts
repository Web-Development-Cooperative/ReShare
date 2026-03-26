import path from 'path';
import { fileURLToPath } from 'url';

import { generateApi } from 'swagger-typescript-api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const services = [
	{
		name: 'identity-api',
		url: 'http://localhost:5001/swagger/v1/swagger.json', // Порт identity-service
		output: 'identity-api.ts',
	},
	{
		name: 'users-api',
		url: 'http://localhost:5002/swagger/v1/swagger.json', // Порт users-service
		output: 'users-api.ts',
	},
	// Добавьте остальные сервисы...
];

const generate = async () => {
	for (const service of services) {
		console.log(`Generating ${service.name}...`);
		try {
			await generateApi({
				fileName: service.output,
				url: service.url,
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
