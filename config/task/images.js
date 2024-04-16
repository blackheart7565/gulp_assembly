import gulp from "gulp";
import imagemin from "gulp-imagemin";
import newer from "gulp-newer";
import webp from "gulp-webp";

import { plumberNotifySettings } from "../common/func.js";
import { path } from "../path.js";

export const images = () => {
	return gulp.src(path.src.images)
		.pipe(plumberNotifySettings("IMAGES"))
		// пропускает файл если он уже был изменен
		.pipe(newer(path.build.images))
		// генерирует webp изображение
		.pipe(webp())
		.pipe(gulp.dest(path.build.images))
		.pipe(gulp.src(path.src.images))
		// пропускает файл если он уже был изменен
		.pipe(newer(path.build.images))
		// уменьшает(сжимает) размер изображения
		.pipe(imagemin({
			verbose: true
		}))
		.pipe(gulp.dest(path.build.images));
};
