import MiniCssExtractPlugin from "mini-css-extract-plugin";
import globImporter from "node-sass-glob-importer";

export const buildLoader = (configs) => {
	const isDev = configs.mode === "development";

	const assetLoader = {
		test: /\.(png|svg|jpg|jpeg|gif)$/i,
		type: "asset/resource",
	};

	const sassLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			// Creates `style` nodes from JS strings
			isDev ? "style-loader" : MiniCssExtractPlugin.loader,
			{
				loader: "string-replace-loader",
				options: {
					search: "../../assets",
					replace: "../assets",
					flags: "g"
				}
			},
			// Translates CSS into CommonJS
			{
				loader: "css-loader",
				options: {
					url: {
						filter: (url, resourcePath) => {
							if (url.includes("images")) {
								return false;
							}
							return true;
						},
					}
				},
			},
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
		assetLoader,
		sassLoader
	];
};