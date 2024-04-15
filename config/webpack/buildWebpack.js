
import { buildLoader } from "./buildLoader.js";
import { buildPlugins } from "./buildPlugins.js";

export const buildWebpack = (configs) => {
	const isDev = configs.mode === "development";
	const isProd = configs.mode === "production";

	return {
		mode: configs.mode,
		entry: configs.paths.entry,
		output: {
			path: configs.paths.output,
			filename: "scripts/[name].js",
			publicPath: "/"
		},
		plugins: buildPlugins(configs),
		module: {
			rules: buildLoader(configs),
		},
		// resolve: {},
		devtool: isDev && "inline-source-map",
		devServer: {
			historyApiFallback: true,
			port: configs.port,
			open: true,
			hot: true,
			host: "localhost", // localhost
			static: configs.paths.src,
			watchFiles: [
				"src/components/**/*.html"
			],
		}
	};
};