import gulp from "gulp";
import autoPrefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import groupCssMediaQueries from "gulp-group-css-media-queries";

import { plumberNotifySettings } from "../common/func.js";
import { path } from "../path.js";

export const style = () => {
	return gulp.src(`${path.build.css}/style.css`)
		.pipe(plumberNotifySettings("STYLE"))

		.pipe(autoPrefixer({
			grid: true,
			cascade: false
		}))
		.pipe(groupCssMediaQueries())
		.pipe(csso())

		.pipe(gulp.dest(path.build.css));
};