import gulp from "gulp";


// # Импорт задач
import {
	clear,
	html,
	scripts,
} from "./config/task/index.js";

const build = gulp.series(
	clear,
	scripts,
	gulp.parallel(html)
);


//# Экспорт сценариев
export {
	build
};

