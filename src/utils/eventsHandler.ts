import type { DateEvent } from './types';
import { isDateInPeriod, assertIsDateEvent } from './utils';

export default class EventsHandler {
    private static instance: EventsHandler | null = null;
    private events: DateEvent[];
    private verbose: boolean;

    constructor(events: DateEvent[], verbose: boolean = false) {
        events.forEach(assertIsDateEvent);

        this.events = [...events];
        this.verbose = verbose;
        if (!EventsHandler.instance) EventsHandler.instance = this;

        this.run();
        return EventsHandler.instance;
    }

    private run() {
        this.events.forEach((event) => {
            const today = new Date();
            if (!isDateInPeriod(today, event.period)) return;

            if (this.verbose) console.log(`Event "${event.name}" executed`);
            event.execute();
        });
    }
}
