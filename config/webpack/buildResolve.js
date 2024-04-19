// import nodePath from "path";

export const buildResolve = (configs) => {
	return {
		extensions: [".tsx", ".ts", ".js", ".jsx"],
		alias: {
			// "@images": nodePath.join(options.paths.src, "assets", "images")
		}
	};
};