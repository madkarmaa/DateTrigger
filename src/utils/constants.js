import { EventBuilder } from './eventBuilder.js';
import { getEaster } from './moon.js';
import { changeColorVars } from './helpers.js';

const currentYear = new Date().getFullYear();

export const DAY_IN_MINUTES = 1440;
export const DEFAULT_EVENTS = {
    NEW_YEAR: new EventBuilder(new Date(currentYear, 1, 1), DAY_IN_MINUTES, () => {
        changeColorVars();
    }),
    CHRISTMAS: new EventBuilder(new Date(currentYear, 11, 25), DAY_IN_MINUTES, () => {
        changeColorVars();
    }),
    VALENTINES_DAY: new EventBuilder(new Date(currentYear, 1, 14), DAY_IN_MINUTES, () => {
        changeColorVars();
    }),
    HALLOWEEN: new EventBuilder(new Date(currentYear, 9, 31), DAY_IN_MINUTES, () => {
        changeColorVars();
    }),
    EASTER: new EventBuilder(getEaster(currentYear), DAY_IN_MINUTES, () => {
        changeColorVars();
    }),
    APRIL_FOOLS: new EventBuilder(new Date(currentYear, 3, 1), DAY_IN_MINUTES, () => {
        changeColorVars();
    }),
};
