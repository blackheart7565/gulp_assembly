import gulp from "gulp";


// # Импорт задач
import {
	clear,
	html,
	scripts,
	style,
} from "./config/task/index.js";

const build = gulp.series(
	clear,
	scripts,
	gulp.parallel(html, style)
);


//# Экспорт сценариев
export {
	build
};

