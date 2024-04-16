import gulp from "gulp";
import notify from "gulp-notify";

import { consoleTextColorGreen } from "../common/colored.js";

export const taskSuccess = () => {
	return gulp.src(".")
		.pipe(notify("The assembly was successful! 🎉"))
		.on("end", () => {
			console.log(consoleTextColorGreen("The assembly was successful! 🎉"));
		});
};