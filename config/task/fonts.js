
import fs from "fs";
import gulp from "gulp";
import debug from "gulp-debug";
import fonter from "gulp-fonter";
import If from "gulp-if";
import newer from "gulp-newer";
import rename from "gulp-rename";
import ttf2woff2 from "gulp-ttf2woff2";
import nodePath from "path";

import {
	consoleTextColorRed
} from "../common/colored.js";
import {
	checkFontWeight,
	getDetailsFont,
	parseCommandLineArgs,
	plumberNotifySettings,
	sortToByItalic,
} from "../common/func.js";
import { path } from "../path.js";

const regExpFontWeight = /(Thin|ExtraLight|Light|Regular|Medium|SemiBold|Bold|ExtraBold|Black)/gi;

export const oftToTtf = () => {
	return gulp.src(path.src.font.files)
		.pipe(plumberNotifySettings("Oft_To_Ttf"))
		.pipe(debug({ title: 'Обработка шрифтов off в ttf:' }))
		.pipe(fonter({
			formats: ["ttf"]
		}))
		.pipe(gulp.dest(path.src.font.folder));
};

export const ttfToWoff = () => {
	const { mode } = parseCommandLineArgs(process.argv);

	return gulp
		.src(`${path.src.font.folder}/*.ttf`)
		.pipe(plumberNotifySettings("Ttf_To_Woff"))
		.pipe(newer(path.build.fonts))
		.pipe(debug({ title: 'Обработка шрифтов ttf в woff:' }))
		.pipe(fonter({
			formats: ["woff"]
		}))
		.pipe(rename((path) => {
			path.basename = path.basename.replace(
				regExpFontWeight,
				(match) => checkFontWeight(match)
			);
		}))
		.pipe(gulp.dest(path.src.font.folder))
		.pipe(If(
			mode === "production",
			gulp.dest(path.build.fonts)
		));
};

export const ttfToWoff2 = () => {
	const { mode } = parseCommandLineArgs(process.argv);

	return gulp
		.src(`${path.src.font.folder}/*.ttf`)
		.pipe(plumberNotifySettings("Ttf_To_Woff2"))
		.pipe(newer(path.build.fonts))
		.pipe(debug({ title: 'Обработка шрифтов ttf в woff2:' }))
		.pipe(ttf2woff2())
		.pipe(rename((path) => {
			path.basename = path.basename.replace(
				regExpFontWeight,
				(match) => checkFontWeight(match)
			);
		}))
		.pipe(gulp.dest(path.src.font.folder))
		.pipe(If(
			mode === "production",
			gulp.dest(path.build.fonts)
		));
};

// template name file font
// fontFamily-weight-style.woff
export const autoGenerationFontFace = () => {
	let pathFontFile = path.src.font.fileAutoGen;
	const extensions = [".woff", ".woff2"];
	let fontFileDetails = [];

	fs.readdir(path.src.font.folder, (err, fontFiles) => {
		if (err) {
			console.error(
				consoleTextColorRed("Произошла ошибка при чтении директории:")
				, consoleTextColorRed(err)
			);
			return;
		}

		// console.log("fontFiles", fontFiles);
		if (!fontFiles.length) {
			console.log(consoleTextColorRed("Папка пуста"));
			return;
		}

		const woffWoff2Files = fontFiles
			.filter(file => extensions.includes(nodePath.extname(file)));

		fontFileDetails = sortToByItalic(getDetailsFont(woffWoff2Files, extensions));

		fs.writeFile(pathFontFile, "", () => { });

		for (const detail of fontFileDetails) {
			const fontStyle = detail.fontStyle ? detail.fontStyle : "normal";
			const fontUrl = [
				detail.fontFamily,
				detail.fontWeight,
				detail.fontStyle ? detail.fontStyle : ""
			].filter(Boolean).join("-");

			fs.appendFile(
				pathFontFile,
				`@include font_face("${detail.fontFamily}", ${checkFontWeight(detail.fontWeight)}, "${fontStyle}", "${fontUrl}");\r\n`,
				(err) => {
					if (err) {
						console.error('Ошибка при записи в файл');
						return;
					}
				}
			);
		}
	});

	return gulp.src(path.rootSrcFolder);
};

export const fonts = gulp.series(
	oftToTtf,
	ttfToWoff,
	ttfToWoff2,
	autoGenerationFontFace
);
