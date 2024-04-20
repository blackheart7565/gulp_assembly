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
		exclude: /node_modules/,
		use: [
			// Creates `style` nodes from JS strings
			isDev ? "style-loader" : MiniCssExtractPlugin.loader,
			{
				loader: "string-replace-loader",
				options: {
					search: "../../assets",
					replace: "../assets",
					flags: "gi"
				}
			},
			// Translates CSS into CommonJS
			{
				loader: "css-loader",
				options: {
					url: {
						filter: (url, resourcePath) => {
							if (url.includes("images") || url.includes("fonts")) {
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

	const tsAndTsLoader = {
		test: /\.(t|j)sx?$/,
		exclude: /node_modules/,
		use: [
			{
				loader: "babel-loader",
				options: {
					presets: [
						"@babel/preset-env",
						"@babel/preset-typescript"
					],
				},
			},
			"ts-loader"
		],
	};

	return [
		assetLoader,
		sassLoader,
		tsAndTsLoader
	];
};