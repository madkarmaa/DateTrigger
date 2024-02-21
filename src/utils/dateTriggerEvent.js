export class DateTriggerEvent {
    /**
     * Helper class for creating events
     * @param {Date} startDate When the event should start
     * @param {number} durationInMinutes How long the event should last for
     * @param {Function} handler The function to call when the event triggers
     */
    constructor(startDate, durationInMinutes, handler) {
        if (!(startDate instanceof Date)) throw new TypeError('startDate must be of type Date');
        if (typeof durationInMinutes !== 'number') throw new TypeError('durationInMinutes must be a number');
        if (typeof handler !== 'function') throw new TypeError('handler must be a function');

        this.startDate = startDate;
        this.durationInMinutes = durationInMinutes;
        this.handler = handler;
        this.endDate = new Date(this.startDate.getTime() + durationInMinutes * 60000);

        Object.freeze(this);
    }
}
