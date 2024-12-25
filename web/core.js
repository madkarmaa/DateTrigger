const isDateInPeriod = (date, period) => {
    return date >= period.from && date <= period.to;
};
const sameDay = (date) => {
    return { from: date, to: date };
};
const getEasterDateOfYear = (year) => {
    const a = year % 19, b = Math.floor(year / 100), c = year % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, L = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * L) / 451), month = Math.floor((h + L - 7 * m + 114) / 31), day = ((h + L - 7 * m + 114) % 31) + 1;
    return new Date(year, month - 1, day);
};
function assertIsPeriod(value) {
    if (!value ||
        typeof value !== 'object' ||
        !value.from ||
        !(value.from instanceof Date) ||
        !value.to ||
        !(value.to instanceof Date))
        throw new Error('Expected a Period object');
}
function assertIsDateEvent(value) {
    if (!value ||
        typeof value !== 'object' ||
        !value.name ||
        typeof value.name !== 'string' ||
        !value.period ||
        !value.execute ||
        typeof value.execute !== 'function')
        throw new Error('Expected a DateEvent object');
    // https://stackoverflow.com/a/72689922
    assertIsPeriod(value.period);
}

class EventsHandler {
    static instance = null;
    events;
    verbose;
    constructor(events, verbose = false) {
        events.forEach(assertIsDateEvent);
        this.events = [...events];
        this.verbose = verbose;
        if (!EventsHandler.instance)
            EventsHandler.instance = this;
        this.run();
        return EventsHandler.instance;
    }
    run() {
        this.events.forEach((event) => {
            const today = new Date();
            if (!isDateInPeriod(today, event.period))
                return;
            if (this.verbose)
                console.log(`Event "${event.name}" executed`);
            event.execute();
        });
    }
}

// EXPOSE TO BROWSER
if (typeof window !== 'undefined') {
    // https://stackoverflow.com/a/38964459
    window['EventsHandler'] = EventsHandler;
    window['getEasterDateOfYear'] = getEasterDateOfYear;
    window['sameDay'] = sameDay;
}

export { EventsHandler, getEasterDateOfYear, sameDay };
