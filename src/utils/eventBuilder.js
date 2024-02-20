export class EventBuilder {
    /**
     * Helper class for creating events
     * @param {Date} date When the event should start
     * @param {number} durationInMinutes How long the event should last for
     * @param {Function} handler The function to call when the event triggers
     */
    constructor(date, durationInMinutes, handler) {
        if (!(date instanceof Date)) throw new TypeError('date must be of type Date');
        if (typeof durationInMinutes !== 'number') throw new TypeError('durationInMinutes must be a number');
        if (typeof handler !== 'function') throw new TypeError('handler must be a function');

        this.date = date;
        this.durationInMinutes = durationInMinutes;
        this.handler = handler;

        Object.freeze(this);
    }
}
