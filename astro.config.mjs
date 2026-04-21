// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://rollomeister.github.io',
	base: '/purple-parallax',
	vite: {
		resolve: {
			alias: {
				'astro/entrypoints/prerender': new URL('./node_modules/astro/dist/entrypoints/prerender.js', import.meta.url).pathname,
				'astro/entrypoints/legacy': new URL('./node_modules/astro/dist/entrypoints/legacy.js', import.meta.url).pathname,
			},
		},
	},
});
