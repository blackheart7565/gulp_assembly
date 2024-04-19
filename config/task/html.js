import gulp from "gulp";
import replace from "gulp-replace";
import webpHTML from "gulp-webp-html-nosvg";

import { plumberNotifySettings } from "../common/func.js";
import { path } from "../path.js";

const regExtReplacePath = /(?<=src=|href=|srcset=)(['"])(\.{0,2}\/)*(assets|scripts|styles|img|images|fonts|files|css|sass|scss|js|video|audio)((\/[^\/'"]+)*)(\/)?([^\/'"]*)\1/gi;

export const html = () => {
	return gulp.src(`${path.build.html}/*.html`)
		.pipe(plumberNotifySettings("HTML"))
		// подержка webp изображения если оно имеется, в противном случаии используеться то что бы ло при входе
		.pipe(webpHTML())
		.pipe(replace(
			regExtReplacePath,
			"$1./$3$4$1"
		))
		.pipe(gulp.dest(path.rootBuildFolder));
};