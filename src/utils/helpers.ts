/**
 * Apply a CSS variable to the document root
 * @param name The name of the variable
 * @param value The value of the variable
 */
export const applyCssVar = (name: string, value: string): void => {
    document.documentElement.style.setProperty(name, value);
};

/**
 * Get the date of when easter should happen based off a given year
 * @param Y The year to get Easter's date from
 * @returns When Easter should happen
 */
export function getEaster(Y: number): Date {
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
