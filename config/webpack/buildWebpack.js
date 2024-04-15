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
		}
	};
};