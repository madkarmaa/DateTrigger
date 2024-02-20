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
        return {
            '--text': text,
            '--background': background,
            '--primary': primary,
            '--secondary': secondary,
            '--accent': accent,
        };
    }
}
