import { DateTriggerEvent } from '../utils/dateTriggerEvent.js';
import { getEaster } from '../utils/moon.js';
import { changeColorVars } from '../utils/helpers.js';
import { DAY_IN_MINUTES } from '../utils/constants.js';

const currentYear = new Date().getFullYear();

export const DEFAULT_EVENTS = {
    NEW_YEAR: new DateTriggerEvent(new Date(currentYear, 0, 1), DAY_IN_MINUTES, () => {
        changeColorVars('#e6e8fe', '#010215', '#7082f9', '#960670', '#f62e65');
    }),
    CHRISTMAS: new DateTriggerEvent(new Date(currentYear, 11, 25), DAY_IN_MINUTES, () => {
        changeColorVars('#fdfcfc', '#030202', '#0ee768', '#f30404', '#ffffff');
    }),
    VALENTINES_DAY: new DateTriggerEvent(new Date(currentYear, 1, 14), DAY_IN_MINUTES, () => {
        changeColorVars('#efd6f9', '#18051f', '#dc8fef', '#93166c', '#e34190');
    }),
    HALLOWEEN: new DateTriggerEvent(new Date(currentYear, 9, 31), DAY_IN_MINUTES, () => {
        changeColorVars('#f2eeed', '#0c0705', '#df9d87', '#923112', '#fd490e');
    }),
    EASTER: new DateTriggerEvent(getEaster(currentYear), DAY_IN_MINUTES, () => {
        changeColorVars('#f7defc', '#09010c', '#dc7df2', '#f60087', '#6cdeb8');
    }),
    APRIL_FOOLS: new DateTriggerEvent(new Date(currentYear, 3, 1), DAY_IN_MINUTES, () => {
        changeColorVars('#ceeafe', '#000910', '#7ec2fc', '#9504af', '#fa28a7');
    }),
};
