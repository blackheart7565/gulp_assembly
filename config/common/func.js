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
