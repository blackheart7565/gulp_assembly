import FileincludeWebpackPlugin from "file-include-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import nodePath from "path";

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
		plugins: [
			...configs.paths.html.map(page => {
				return new HtmlWebpackPlugin({
					minify: false,
					template: nodePath.resolve(configs.paths.src, "components", "pages", page),
					filename: page
				});
			}),

			new FileincludeWebpackPlugin({
				source: "src/components/pages",
				htmlBeautifyOptions: {
					"indent-with-tabs": true,
					"indent_size": 3
				},
			})
		],
		// module: {
		// 	rules: [],
		// },
		// resolve: {},
		devtool: "inline-source-map",
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