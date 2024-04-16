import gulp from "gulp";


// # Импорт задач
import {
	clear,
	html,
	scripts,
	style,
	images,
} from "./config/task/index.js";

const build = gulp.series(
	clear,
	scripts,
	gulp.parallel(
		html,
		style,
		images
	)
);


//# Экспорт сценариев
export {
	build
};

