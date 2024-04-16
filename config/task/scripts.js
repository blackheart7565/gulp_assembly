import gulp from "gulp";
import webpack from "webpack";
import webpackStream from "webpack-stream";

import webpackConfig from "../../webpack.config.js";
import {
	parseCommandLineArgs,
	plumberNotifySettings,
} from "../common/func.js";
import { path } from "../path.js";

export const scripts = () => {
	const { mode } = parseCommandLineArgs(process.argv);
	return gulp.src(path.src.scripts)
		.pipe(plumberNotifySettings("JS/TS"))
		// подержка webpack конфигурации (webpack.config.js)
		.pipe(webpackStream(webpackConfig({
			mode,
		}), webpack))
		.pipe(gulp.dest(path.rootBuildFolder));
};