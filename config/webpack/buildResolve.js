// import nodePath from "path";

export const buildResolve = (options) => {
	return {
		extensions: [".tsx", ".ts", ".js", ".jsx"],
		alias: {
			// "@images": nodePath.join(options.paths.src, "assets", "images")
		}
	};
};