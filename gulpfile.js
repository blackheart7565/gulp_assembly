import gulp from "gulp";


// # Импорт задач
import {
	clear,
	html,
	images,
	scripts,
	style,
	taskSuccess
} from "./config/task/index.js";

const build = gulp.series(
	clear,
	scripts,
	gulp.parallel(
		html,
		style,
		images
	),
	taskSuccess
);


//# Экспорт сценариев
export {
	build
};

