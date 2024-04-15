import gulp from "gulp";

import { plumberNotifySettings } from "../common/func.js";
import { path } from "../path.js";

export const html = () => {
	return gulp.src(`${path.build.html}/*.html`)
		.pipe(plumberNotifySettings("HTML"))
		.pipe(gulp.dest(path.rootBuildFolder));
};