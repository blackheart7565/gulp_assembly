import nodePath from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = nodePath.dirname(__filename);

export const entryConfig = {
	home: nodePath.resolve(__dirname, "src", "scripts", "home.js"),
	// contact: nodePath.resolve(__dirname, "src", "scripts", "contact.js")
};