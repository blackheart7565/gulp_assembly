

export const buildDevServer = (configs) => {
	return {
		historyApiFallback: true,
		port: configs.port,
		open: true,
		hot: true,
		host: "localhost", // localhost
		static: configs.paths.src,
		watchFiles: [
			"src/components/**/*.html"
		],
	};
};