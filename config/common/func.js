import { onError } from "gulp-notify";
import plumber from "gulp-plumber";

export const plumberNotifySettings = (title) => {
	return plumber({
		errorHandler: onError({
			title: title,
			message: "Error <%= error.message %>",
			sound: false,
		})
	});
};

/**
 * 
 * @param {string[]} value 
 * @returns 
 */
export const parseCommandLineArgs = (argv) => {
	return argv.slice(2)
		.filter(vars => vars.startsWith("--"))
		.map(item => item
			.slice(2)
			.split(/=|:/))
		.reduce((obj, [key, value]) => ({
			...obj,
			[key]: value
		}), {});
};


/**
 * Функция для получения деталей фаайла шрифта
 * @param {string[]} fontFIles 
 * @param {string[]} extensions 
 * @returns возвращает уникальный обьект деталей шрифта {
	fontFamily,
	fontWeight,
	fontStyle,
 * }
 */
export const getDetailsFont = (fontFIles, extensions) => {
	const fontDetails = [];

	for (const item of fontFIles) {
		const font = item.split(/[-.]/gi);
		fontDetails.push({
			fontFamily: font[0],
			fontWeight: font[1],
			fontStyle: extensions.includes(`.${font[2]}`) ? undefined : font[2],
		});
	}

	const uniqueFontDetails = Array
		.from(new Set(
			fontDetails.map(JSON.stringify)
		))
		.map(JSON.parse);

	return uniqueFontDetails;
};

/**
 * Функция сортирует детали шрифта по font-style
 * @param {string[]} fontFIles масив деталей
 * @returns возвращает отсортированый масив деталей, где Italic идёт вконце
 */
export const sortToByItalic = (fontFIles) => {
	const style = "italic";

	// -1 <= 0 <= 1
	return fontFIles.sort((a, b) => {
		const fontStyleA = a.fontStyle?.toLowerCase();
		const fontStyleB = b.fontStyle?.toLowerCase();

		if (fontStyleA === style && fontStyleB !== style) {
			return 1;
		} else if (fontStyleA !== style && fontStyleB === style) {
			return -1;
		} else {
			return 0;
		}
	});
};

/**
 * 	Thin  = 100;
	ExtraLight = 200;
	Light = 300;
	Regular = 400;
	Medium = 500;
	SemiBold = 600;
	Bold = 700;
	ExtraBold = 800;
	Black = 900;
  @param {string} fontWeight толщина шрифта
 * @returns возвращает числовый weight шрифта
 */
export const checkFontWeight = (fontWeight) => {
	const weight = ["100", "200", "300", "400", "500", "600", "700", "800", "900"];
	const fontWeightNameList = {
		Thin: 100,
		ExtraLight: 200,
		Light: 300,
		Regular: 400,
		Medium: 500,
		SemiBold: 600,
		Bold: 700,
		ExtraBold: 800,
		Black: 900,
	};
	return weight.includes(fontWeight) ? fontWeight : fontWeightNameList[fontWeight];
};