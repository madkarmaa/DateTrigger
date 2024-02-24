export class DateTriggerEvent {
    startDate: Date;
    durationInMinutes: number;
    handler: () => void;
    endDate: Date;

    /**
     * Helper class for creating events
     * @param startDate When the event should start
     * @param durationInMinutes How long the event should last for
     * @param handler The function to call when the event triggers
     */
    constructor(startDate: Date, durationInMinutes: number, handler: () => void) {
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
