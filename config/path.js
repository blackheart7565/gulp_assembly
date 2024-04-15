const buildFolder = "./build";
const srcFolder = "./src";

const getBuildFolder = (url) => `./build${url || ""}`;
const getSrcFolder = (url) => `./src${url || ""}`;

export const path = {
	build: {
		html: getBuildFolder(),
		css: getBuildFolder("/css/"),
		scripts: getBuildFolder("/scripts/"),
		images: getBuildFolder("/assets/images/"),
		fonts: getBuildFolder("/assets/fonts/"),
		files: getBuildFolder("/assets/files/"),
	},
	src: {
		html: getSrcFolder("/components/pages/*.html"),
		scss: getSrcFolder("/styles/*.{sass,scss}"),
		scripts: getSrcFolder("/scripts/*.{js,ts}"),
		images: getSrcFolder("/assets/images/**/*.+(jpg|jpeg|png|svg|gif|ico|JPG|JPEG|PNG|SVG|GIF|ICO)"),
		fonts: getSrcFolder("/assets/fonts/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}"),
		files: getSrcFolder("/assets/files/**/*"),
	},
	watch: {
		// html: getSrcFolder("/components/**/*.html"),
		// scss: getSrcFolder("/styles/**/*.{sass,scss}"),
		// jsScripts: getSrcFolder("/scripts/**/*.js"),
		// images: getSrcFolder("/assets/images/**/*.+(jpg|jpeg|png|svg|gif|ico|JPG|JPEG|PNG|SVG|GIF|ICO)"),
		// fonts: getSrcFolder("/assets/fonts/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}"),
		// files: getSrcFolder("/assets/files/**/*"),
	},
	clear: buildFolder,
	rootBuildFolder: buildFolder,
	rootSrcFolder: srcFolder,
};