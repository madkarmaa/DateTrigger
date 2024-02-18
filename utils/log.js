let oldLog = console.log;
/**
 * Custom logging function copied from `console.log`
 * @param  {...any} args `console.log` arguments
 * @returns {void}
 */
const logger = (...args) => oldLog.apply(console, ['\x1b[31m[Holidays Theme Changer]\x1b[0m', ...args]);

export default logger;
