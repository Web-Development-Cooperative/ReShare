import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
// eslint-disable-next-line import/no-unresolved
import tseslint from 'typescript-eslint';
// eslint-disable-next-line import/no-unresolved
import { defineConfig, globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';

export default defineConfig([
	importPlugin.flatConfigs.recommended,
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs.flat.recommended,
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		settings: {
			'import/resolver': {
				typescript: {
				alwaysTryTypes: true,
				project: [
				'./tsconfig.json',
				'./tsconfig.app.json'
				],
				},
			},
			'import/internal-regex': '^@/',
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			'no-console': 'warn',
			'prefer-const': 'error',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
				},
			],
			quotes: ['error', 'single'],
			'jsx-quotes': ['error', 'prefer-double'],
			'import/newline-after-import': [
				'error',
				{ count: 1, exactCount: true },
			],
			'import/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						['parent', 'sibling', 'index', 'type', 'unknown'],
					],
					'newlines-between': 'always',
					// Помечаем @/* как внутренние импорты
					pathGroups: [
					{
						pattern: '@/**',
						group: 'internal',
						position: 'after',
					},
					],
						pathGroupsExcludedImportTypes: ['builtin'],
						alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],
		},
	},
]);
