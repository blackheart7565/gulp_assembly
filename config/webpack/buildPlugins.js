import CopyPlugin from "copy-webpack-plugin";
import FileincludeWebpackPlugin from "file-include-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import nodePath from "path";

export const buildPlugins = (configs) => {
	const isDev = configs.mode === "development";
	const isProd = configs.mode === "production";

	const plugins = [
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
		}),

	];

	if (isDev) {

	}

	if (isProd) {
		plugins.push(
			new MiniCssExtractPlugin({
				filename: configs.paths.outputStyles,
				chunkFilename: configs.paths.outputStyles,
			})
		);

		plugins.push(
			new CopyPlugin({
				patterns: [
					{
						from: nodePath.resolve(configs.paths.src, "assets", "files"),
						to: nodePath.resolve(configs.paths.output, "assets", "files")
					},
				],
			})
		);
	}

	return plugins;
};