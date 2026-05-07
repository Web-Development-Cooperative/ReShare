import { resolve } from 'eslint-import-resolver-typescript';
import path from 'path';

const result = resolve(
	'@app/providers',
	path.resolve(process.cwd(), 'src/App.tsx'),
	{
		project: [
			path.resolve(process.cwd(), './tsconfig.json'),
			path.resolve(process.cwd(), './tsconfig.app.json'),
		],
		alwaysTryTypes: true,
	}
);

console.log('Result:', result);
// Если ok: true — резолвер работает
// Если ok: false — проблема в tsconfig или путях
