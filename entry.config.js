import fs from "fs";
import nodePath from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = nodePath.dirname(__filename);

const entryFiles = () => {
	return fs.readdirSync("src/scripts")
		.filter(file => file.endsWith(".js") || file.endsWith(".ts"))
		.reduce((obj, value) => {
			const key = value.split(".")[0];
			return {
				...obj,
				[key]: nodePath.resolve(__dirname, "src", "scripts", value)
			};
		}, {});
};

export const entryConfig = {
	...entryFiles(),
	// home: nodePath.resolve(__dirname, "src", "scripts", "home.js"),
	// contact: nodePath.resolve(__dirname, "src", "scripts", "contact.js")
};
