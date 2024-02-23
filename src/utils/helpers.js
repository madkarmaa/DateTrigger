/**
 * Apply a CSS variable to the document root
 * @param {string} name The name of the variable
 * @param {string} value The value of the variable
 */
export const applyCssVar = (name, value) => {
    document.documentElement.style.setProperty(name, value);
};

/**
 * Apply CSS variables to the document root
 * @param {string} text
 * @param {string} background
 * @param {string} primary
 * @param {string} secondary
 * @param {string} accent
 */
export const changeColorVars = (text, background, primary, secondary, accent) => {
    Object.entries(ColorSet.build(text, background, primary, secondary, accent)).forEach(([key, val]) => {
        applyCssVar(key, val);
    });
};

export class ColorSet {
    /**
     * Return an object of fixed CSS variables with given values
     * @param {string} text
     * @param {string} background
     * @param {string} primary
     * @param {string} secondary
     * @param {string} accent
     * @returns
     */
    static build(text, background, primary, secondary, accent) {
        if (!(arguments.length === 5)) throw new Error('Please specify all arguments');
        if (Array.from(arguments).some((arg) => typeof arg !== 'string'))
            throw new Error('All arguments must be strings');

        return {
            '--text': text,
            '--background': background,
            '--primary': primary,
            '--secondary': secondary,
            '--accent': accent,
        };
    }
}

/**
 * Get the date of when easter should happen based off a given year
 * @param {number} Y The year to get Easter's date from
 * @returns {Date} When Easter should happen
 */
export function getEaster(Y) {
    const a = Y % 19,
        b = Math.floor(Y / 100),
        c = Y % 100,
        d = Math.floor(b / 4),
        e = b % 4,
        f = Math.floor((b + 8) / 25),
        g = Math.floor((b - f + 1) / 3),
        h = (19 * a + b - d - g + 15) % 30,
        i = Math.floor(c / 4),
        k = c % 4,
        L = (32 + 2 * e + 2 * i - h - k) % 7,
        m = Math.floor((a + 11 * h + 22 * L) / 451),
        month = Math.floor((h + L - 7 * m + 114) / 31),
        day = ((h + L - 7 * m + 114) % 31) + 1;
    return new Date(Y, month - 1, day);
}
