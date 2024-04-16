import { buildDevServer } from "./buildDevServer.js";
import { buildLoader } from "./buildLoader.js";
import { buildOutPut } from "./buildOutPut.js";
import { buildPlugins } from "./buildPlugins.js";
import { buildResolve } from "./buildResolve.js";

export const buildWebpack = (configs) => {
	const isDev = configs.mode === "development";
	const isProd = configs.mode === "production";

	return {
		mode: configs.mode,
		entry: configs.paths.entry,
		output: buildOutPut(configs),
		plugins: buildPlugins(configs),
		module: {
			rules: buildLoader(configs),
		},
		resolve: buildResolve(configs),
		devtool: isDev && "inline-source-map",
		devServer: isDev ? buildDevServer(configs) : undefined,
	};
};
