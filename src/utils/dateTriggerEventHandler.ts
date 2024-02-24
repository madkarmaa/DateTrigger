import { DateTriggerEvent } from './dateTriggerEvent.js';

export class DateTriggerEventHandler {
    private static instance?: DateTriggerEventHandler;
    private now: Date;
    private events: DateTriggerEvent[];

    /**
     * Trigger events on specific dates
     * @param customEvents A list of DateTriggerEvent class instances
     */
    constructor(customEvents: DateTriggerEvent[] = []) {
        if (typeof customEvents !== 'object') throw new TypeError('customEvents must be an object');
        if (customEvents.some((e) => !(e instanceof DateTriggerEvent)))
            throw new TypeError('Every entry in customEvents must be an instance of DateTriggerEvent');

        this.now = new Date();
        this.events = [...customEvents];

        if (!DateTriggerEventHandler.instance) DateTriggerEventHandler.instance = this;

        Object.freeze(this);
        this.run();

        return DateTriggerEventHandler.instance;
    }

    private run() {
        Object.values(this.events).forEach((event: DateTriggerEvent) => {
            if (this.areSameDate(event.startDate, this.now) && this.isEventActive(event)) event.handler();
        });
    }

    /**
     * https://stackoverflow.com/a/8394028
     */
    private areSameDate(d1: Date, d2: Date): boolean {
        return d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    }

    /**
     * Check if an event is active
     * @param event The event to check if it's active
     */
    private isEventActive(event: DateTriggerEvent): boolean {
        if (!(event instanceof DateTriggerEvent)) throw new TypeError('event must be an instance of DateTriggerEvent');

        const now = Date.parse(new Date().toString());
        const eventStartTime = Date.parse(event.startDate.toString());
        const eventEndTime = Date.parse(event.endDate.toString());

        return now >= eventStartTime && now <= eventEndTime;
    }
}
