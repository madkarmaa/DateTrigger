class DateTriggerEvent {
    /**
     * Helper class for creating events
     * @param startDate When the event should start
     * @param durationInMinutes How long the event should last for
     * @param handler The function to call when the event triggers
     */
    constructor(startDate, durationInMinutes, handler) {
        if (!(startDate instanceof Date))
            throw new TypeError('startDate must be of type Date');
        if (typeof durationInMinutes !== 'number')
            throw new TypeError('durationInMinutes must be a number');
        if (typeof handler !== 'function')
            throw new TypeError('handler must be a function');
        this.startDate = startDate;
        this.durationInMinutes = durationInMinutes;
        this.handler = handler;
        this.endDate = new Date(this.startDate.getTime() + durationInMinutes * 60000);
        Object.freeze(this);
    }
}

class DateTriggerEventHandler {
    /**
     * Trigger events on specific dates
     * @param customEvents A list of DateTriggerEvent class instances
     */
    constructor(customEvents = []) {
        if (typeof customEvents !== 'object')
            throw new TypeError('customEvents must be an object');
        if (customEvents.some((e) => !(e instanceof DateTriggerEvent)))
            throw new TypeError('Every entry in customEvents must be an instance of DateTriggerEvent');
        this.now = new Date();
        this.events = [...customEvents];
        if (!DateTriggerEventHandler.instance)
            DateTriggerEventHandler.instance = this;
        Object.freeze(this);
        this.run();
        return DateTriggerEventHandler.instance;
    }
    run() {
        Object.values(this.events).forEach((event) => {
            if (this.areSameDate(event.startDate, this.now) && this.isEventActive(event))
                event.handler();
        });
    }
    /**
     * https://stackoverflow.com/a/8394028
     */
    areSameDate(d1, d2) {
        return d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    }
    /**
     * Check if an event is active
     * @param event The event to check if it's active
     */
    isEventActive(event) {
        if (!(event instanceof DateTriggerEvent))
            throw new TypeError('event must be an instance of DateTriggerEvent');
        const now = Date.parse(new Date().toString());
        const eventStartTime = Date.parse(event.startDate.toString());
        const eventEndTime = Date.parse(event.endDate.toString());
        return now >= eventStartTime && now <= eventEndTime;
    }
}

const DAY_IN_MINUTES = 1440;

// EXPOSE TO BROWSER
if (typeof window !== 'undefined') {
    // https://stackoverflow.com/a/38964459
    window['DateTriggerEventHandler'] = DateTriggerEventHandler;
    window['DateTriggerEvent'] = DateTriggerEvent;
    window['DAY_IN_MINUTES'] = DAY_IN_MINUTES;
}

export { DAY_IN_MINUTES, DateTriggerEvent, DateTriggerEventHandler };
