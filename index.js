// https://github.com/ReVanced/revanced-website/issues/226

import { getEaster } from './utils/moon.js';
import logger from './utils/log.js';

// https://github.com/madkarmaa/revanced-website/blob/main/src/app.scss#L36
function buildColorsArray() {
    return []; // TODO: add logic
}

const EVENTS = {
    NEW_YEAR: {
        date: new Date(2024, 1, 1),
    },
    CHRISTMAS: {
        date: new Date(2024, 11, 25),
    },
    VALENTINES_DAY: {
        date: new Date(2024, 1, 14),
    },
    HALLOWEEN: {
        date: new Date(2024, 9, 31),
    },
    EASTER: {
        date: getEaster(2024),
    },
    APRIL_FOOLS: {
        date: new Date(2024, 3, 1),
    },
};

class EventThemeChanger {
    constructor() {
        // this.today = new Date();
        this.today = new Date(2024, 1, 1);
        this.events = { ...EVENTS };

        Object.freeze(this);
        this.#run();
    }

    #run() {
        for (const event in this.events) {
            if (this.#areSameDate(this.events[event].date, this.today)) {
                logger('Today is', event, 'applying new CSS variables...');

                // TODO: add logic

                logger('Done :)');
                break;
            }
        }
    }

    // https://stackoverflow.com/a/8394028
    #areSameDate(d1, d2) {
        return d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    }

    #applyCssVar(name, value) {
        document.documentElement.style.setProperty(name, value);
    }
}

if (window) window['EventThemeChanger'] = EventThemeChanger; // expose to browser
export default EventThemeChanger;
