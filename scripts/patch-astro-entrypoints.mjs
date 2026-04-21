import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const astroDir = path.resolve("node_modules", "astro");
const entrypointsDir = path.join(astroDir, "entrypoints");

const files = [
	{
		name: "prerender.js",
		content: 'export * from "../dist/entrypoints/prerender.js";\n',
	},
	{
		name: "legacy.js",
		content: 'export * from "../dist/entrypoints/legacy.js";\n',
	},
	{
		name: "prerender.d.ts",
		content: 'export * from "../dist/entrypoints/prerender.js";\n',
	},
	{
		name: "legacy.d.ts",
		content: 'export * from "../dist/entrypoints/legacy.js";\n',
	},
];

await mkdir(entrypointsDir, { recursive: true });

await Promise.all(
	files.map((file) =>
		writeFile(path.join(entrypointsDir, file.name), file.content, "utf8"),
	),
);

console.log("Patched Astro entrypoint bridge files.");
