import fs from "fs";
import nodePath from "path";
import url from "url";

import { buildWebpack } from "./config/webpack/buildWebpack.js";
import { entryConfig } from "./entry.config.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = nodePath.dirname(__filename);

const htmlPages = fs.readdirSync("src/components/pages")
	.filter(page => page.endsWith(".html"));

/**
 * Interface:
 * @param { string } mode = "development" | "production"
 * @param { number } port = default port = 3000
 */
export default (env) => {
	const paths = {
		entry: entryConfig,
		output: nodePath.resolve(__dirname, "build"),
		html: htmlPages,
		src: nodePath.resolve(__dirname, "src"),
	};
	const config = buildWebpack({
		port: env.port ?? 3000,
		mode: env.mode ?? "development",
		paths
	});
	return config;
};