import gulp from "gulp";
import autoPrefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import groupCssMediaQueries from "gulp-group-css-media-queries";
import webpCSS from "gulp-webp-css";

import { plumberNotifySettings } from "../common/func.js";
import { path } from "../path.js";

export const style = () => {
	return gulp.src(`${path.build.css}/style.css`)
		.pipe(plumberNotifySettings("STYLE"))

		// подержка webp изображения если оно имеется в противном случаии используеться то что бы ло при входе
		.pipe(webpCSS())
		// добавляет подерживаемый префикс для браузера делая его кросплатформеным , будут браться префиксы первых последних 5 версий браузеров 
		.pipe(autoPrefixer({
			grid: true,
			cascade: false
		}))
		// групирует одинаковые @media запросы
		.pipe(groupCssMediaQueries())
		// минимизирует css файл, удаляя лишние коментарии и пробелы
		.pipe(csso())

		.pipe(gulp.dest(path.build.css));
};