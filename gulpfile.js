import gulp from "gulp";


// # Импорт задач
import {
	clear,
	html,
	images,
	scripts,
	style,
	fonts,
	taskSuccess
} from "./config/task/index.js";


//# Экспорт задач
export {
	clear,
	html,
	images,
	scripts,
	style,
	fonts,
};

//# Сценарии
const build = gulp.series(
	clear,
	scripts,
	gulp.parallel(
		html,
		style,
		images,
		fonts
	),
	taskSuccess
);

const font = gulp.series(
	clear,
	fonts
);

//# Экспорт сценариев
export {
	build,
	font
};

