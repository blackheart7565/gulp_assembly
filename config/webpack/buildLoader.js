import MiniCssExtractPlugin from "mini-css-extract-plugin";
import globImporter from "node-sass-glob-importer";

export const buildLoader = (configs) => {
	const isDev = configs.mode === "development";

	const sassLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			// Creates `style` nodes from JS strings
			isDev ? "style-loader" : MiniCssExtractPlugin.loader,
			// Translates CSS into CommonJS
			"css-loader",
			// Compiles Sass to CSS
			{
				loader: "sass-loader",
				options: {
					sassOptions: {
						importer: globImporter()
					}
				}
			}
		],
	};

	return [
		sassLoader
	];
};