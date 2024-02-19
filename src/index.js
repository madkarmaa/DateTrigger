// https://github.com/ReVanced/revanced-website/issues/226

import { getEaster } from './utils/moon.js';
import logger from './utils/log.js';
import { EventBuilder, DAY_IN_MINUTES } from './utils/eventBuilder.js';

// https://github.com/madkarmaa/revanced-website/blob/main/src/app.scss#L36

const applyCssVar = (name, value) => {
    document.documentElement.style.setProperty(name, value);
};

const EVENTS = {
    NEW_YEAR: new EventBuilder(new Date(2024, 1, 1), DAY_IN_MINUTES, () => {}),
    CHRISTMAS: new EventBuilder(new Date(2024, 11, 25), DAY_IN_MINUTES, () => {}),
    VALENTINES_DAY: new EventBuilder(new Date(2024, 1, 14), DAY_IN_MINUTES, () => {}),
    HALLOWEEN: new EventBuilder(new Date(2024, 9, 31), DAY_IN_MINUTES, () => {}),
    EASTER: new EventBuilder(getEaster(new Date().getFullYear()), DAY_IN_MINUTES, () => {}),
    APRIL_FOOLS: new EventBuilder(new Date(2024, 3, 1), DAY_IN_MINUTES, () => {}),
};

class EventThemeChanger {
    /**
     * Trigger events on specific dates
     * @param {Record<any, EventBuilder> | {}} customEvents An object of custom events built with the EventBuilder class. **NOTE**: the key is the name of the event
     * @param {boolean} useEventsPreset Also add the default set of events
     */
    constructor(customEvents = {}, useEventsPreset = false) {
        if (typeof customEvents !== 'object') throw new TypeError('customEvents must be an object');
        if (Object.values(customEvents).some((e) => !(e instanceof EventBuilder)))
            throw new TypeError('Every entry in customEvents must be an instance of EventBuilder');
        if (typeof useEventsPreset !== 'boolean') throw new TypeError('useEventsPreset must be boolean');

        // this.today = new Date();
        this.today = new Date(2024, 1, 1);

        this.events = { ...customEvents };
        // expand first the preset so it can be overridden by the user's events
        if (useEventsPreset) this.events = { ...EVENTS, ...this.events };

        Object.freeze(this);
        this.#run();
    }

    #run() {
        for (const event in this.events) {
            const EVENT = this.events[event];
            if (this.#areSameDate(EVENT.date, this.today)) {
                logger('Triggered ' + event + ' event!');
                EVENT.handler();
                break;
            }
        }
    }

    // https://stackoverflow.com/a/8394028
    #areSameDate(d1, d2) {
        return d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    }
}

if (typeof window !== 'undefined') {
    window['EventThemeChanger'] = EventThemeChanger;
    window['EventBuilder'] = EventBuilder;
    window['DAY_IN_MINUTES'] = DAY_IN_MINUTES;
}

export { EventThemeChanger, EventBuilder, DAY_IN_MINUTES };
