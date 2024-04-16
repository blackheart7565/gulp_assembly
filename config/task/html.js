import gulp from "gulp";
import webpHTML from "gulp-webp-html-nosvg";

import { plumberNotifySettings } from "../common/func.js";
import { path } from "../path.js";

export const html = () => {
	return gulp.src(`${path.build.html}/*.html`)
		.pipe(plumberNotifySettings("HTML"))
		// подержка webp изображения если оно имеется, в противном случаии используеться то что бы ло при входе
		.pipe(webpHTML())
		.pipe(gulp.dest(path.rootBuildFolder));
};