import { DateTriggerEvent } from './utils/dateTriggerEvent.js';
import { EventsHandler } from './utils/eventsHandler.js';
import { DAY_IN_MINUTES, DEFAULT_EVENTS } from './utils/constants.js';

// EXPOSE TO BROWSER
if (typeof window !== 'undefined') {
    window['EventsHandler'] = EventsHandler;
    window['DateTriggerEvent'] = DateTriggerEvent;
    window['DAY_IN_MINUTES'] = DAY_IN_MINUTES;
    window['DEFAULT_EVENTS'] = DEFAULT_EVENTS;
}

export { EventsHandler, DateTriggerEvent, DAY_IN_MINUTES, DEFAULT_EVENTS };
