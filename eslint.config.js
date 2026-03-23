import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import-x';

export default defineConfig([
	// eslint-disable-next-line import-x/no-named-as-default-member
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
					project: ['./tsconfig.json', './tsconfig.app.json'],
				},
			},
			'import/internal-regex': '^@/',
			'import/extensions': [
				'.js',
				'.jsx',
				'.ts',
				'.tsx',
				'.css',
				'.module.css',
			],
		},
		plugins: {
			import: importPlugin,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'import-x/no-unresolved': 'off',
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
						['parent', 'sibling', 'index', 'unknown'],
						'type',
					],

					'newlines-between': 'always',

					pathGroups: [
						{
							pattern: 'react**',
							group: 'builtin',
							position: 'before',
						},
						{ pattern: '@shared/**', group: 'internal' },
						{ pattern: '@app/**', group: 'internal' },
						{ pattern: '@pages/**', group: 'internal' },
						{ pattern: '@widgets/**', group: 'internal' },
						{ pattern: '@features/**', group: 'internal' },
						{ pattern: '@entities/**', group: 'internal' },
					],
					pathGroupsExcludedImportTypes: ['type'],

					alphabetize: {
						// order: 'asc',
						// caseInsensitive: true,
					},
				},
			],
		},
	},
]);
