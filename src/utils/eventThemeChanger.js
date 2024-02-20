import { DEFAULT_EVENTS } from './constants.js';
import { EventBuilder } from './eventBuilder.js';

export class EventThemeChanger {
    /**
     * Trigger events on specific dates
     * @param {Record<any, EventBuilder> | {}} customEvents An object of custom events built with the EventBuilder class. **NOTE**: the key is the name of the event
     * @param {boolean} useEventsPreset Also add the default set of events
     */
    constructor(customEvents = { ...DEFAULT_EVENTS }, useEventsPreset = false) {
        if (typeof customEvents !== 'object') throw new TypeError('customEvents must be an object');
        if (Object.values(customEvents).some((e) => !(e instanceof EventBuilder)))
            throw new TypeError('Every entry in customEvents must be an instance of EventBuilder');
        if (typeof useEventsPreset !== 'boolean') throw new TypeError('useEventsPreset must be boolean');

        // this.today = new Date();
        this.today = new Date(2024, 0, 1);
        this.events = { ...customEvents };

        Object.freeze(this);
        this.#run();
    }

    #run() {
        for (const evName in this.events) {
            const event = this.events[evName];
            if (this.#areSameDate(event.date, this.today)) event.handler();
        }
    }

    // https://stackoverflow.com/a/8394028
    #areSameDate(d1, d2) {
        return d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    }
}
