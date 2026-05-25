// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://triimkurbas.com',
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				'astro/entrypoints/prerender': new URL('./node_modules/astro/dist/entrypoints/prerender.js', import.meta.url).pathname,
				'astro/entrypoints/legacy': new URL('./node_modules/astro/dist/entrypoints/legacy.js', import.meta.url).pathname,
			},
		},
	},
});
