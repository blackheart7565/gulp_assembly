
/**
 * 
 * @param {string} text 
 * @returns жёлтый текст
 */
export const consoleTextColorYellow = (text) => `\x1b[33;1m${text}\x1b[0m`;
/**
 * 
 * @param {string} text 
 * @returns синий текст
 */
export const consoleTextColorBlue = (text) => ` \x1b[34;1m${text}\x1b[0m`;
/**
 * 
 * @param {string} text 
 * @returns зелёный текст
 */
export const consoleTextColorGreen = (text) => ` \x1b[32;1m${text}\x1b[0m`;