import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/setupTests.ts',
	},
	resolve: {
		alias: {
			'~~>app': '/src/app',
			'~~>pages': '/src/pages',
			'~~>widgets': '/src/widgets',
			'~~>features': '/src/features',
			'~~>entities': '/src/entities',
			'~~>shared': '/src/shared',
		},
	},
	build: {
		rollupOptions: {
			output: {
				assetFileNames: 'assets/my-[name]-[hash][extname]',
				chunkFileNames: 'assets/my-[name]-[hash].js',
				entryFileNames: 'assets/my-[name]-[hash].js',
			},
		},
	},
	base: mode === 'production' ? '/' : '',
}));
