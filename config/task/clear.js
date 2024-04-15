import { deleteAsync } from "del";

import { path } from "../path.js";

export const clear = async () => {
	return deleteAsync(path.rootBuildFolder);
};