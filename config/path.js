import {
	parseCommandLineArgs
} from "./common/func.js";

const { deploy } = parseCommandLineArgs(process.argv);

const buildFolder = deploy ? "./doc" : "./build";
const srcFolder = "./src";

const getBuildFolder = (url) => `${buildFolder}${url || ""}`;
const getSrcFolder = (url) => `${srcFolder}${url || ""}`;

export const path = {
	build: {
		html: getBuildFolder(),
		css: getBuildFolder("/css"),
		scripts: getBuildFolder("/scripts/"),
		images: getBuildFolder("/assets/images/"),
		fonts: getBuildFolder("/assets/fonts/"),
	},
	src: {
		html: getSrcFolder("/components/pages/*.html"),
		scss: getSrcFolder("/styles/*.{sass,scss}"),
		scripts: getSrcFolder("/scripts/*.{js,ts}"),
		images: getSrcFolder("/assets/images/**/*.+(jpg|jpeg|png|svg|gif|ico|JPG|JPEG|PNG|SVG|GIF|ICO)"),
		font: {
			files: getSrcFolder("/assets/fonts/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}"),
			folder: getSrcFolder("/assets/fonts"),
			fileAutoGen: getSrcFolder("/styles/common/_fonts.scss")
		}
	},
	clear: buildFolder,
	rootBuildFolder: buildFolder,
	rootSrcFolder: srcFolder,
};