

export const buildOutPut = (configs) => {
	return {
		path: configs.paths.output,
		filename: "scripts/[name].js",
		publicPath: "/",
		assetModuleFilename: 'assets/images/[name][ext]',
	};
};