import { DEFAULT_EVENTS } from './constants.js';
import { EventBuilder } from './eventBuilder.js';

export class EventsHandler {
    /**
     * Trigger events on specific dates
     * @param {Record<any, EventBuilder> | undefined} customEvents An object of EventBuilder class instances. **NOTE**: the key is considered the name of the event
     */
    constructor(customEvents = { ...DEFAULT_EVENTS }) {
        if (typeof customEvents !== 'object') throw new TypeError('customEvents must be an object');
        if (Object.values(customEvents).some((e) => !(e instanceof EventBuilder)))
            throw new TypeError('Every entry in customEvents must be an instance of EventBuilder');

        this.now = new Date();
        this.events = { ...customEvents };

        if (!EventsHandler.instance) EventsHandler.instance = this;

        Object.freeze(this);
        this.#run();

        return EventsHandler.instance;
    }

    #run() {
        for (const evName in this.events) {
            const event = this.events[evName];
            if (this.#areSameDate(event.startDate, this.now) && this.#isEventActive(event)) event.handler();
        }
    }

    /**
     * https://stackoverflow.com/a/8394028
     * @param {Date} d1
     * @param {Date} d2
     * @returns {boolean}
     */
    #areSameDate(d1, d2) {
        return d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    }

    /**
     * Check if an event is active
     * @param {EventBuilder} event The event to check if it's active
     * @returns {boolean}
     */
    #isEventActive(event) {
        if (!(event instanceof EventBuilder)) throw new TypeError('event must be an instance of EventBuilder');

        const now = Date.parse(new Date());
        const eventStartTime = Date.parse(event.startDate);
        const eventEndTime = Date.parse(event.endDate);

        return now >= eventStartTime && now <= eventEndTime;
    }
}
