import { DateTriggerEvent } from './utils/dateTriggerEvent.js';
import { DateTriggerEventsHandler } from './utils/dateTriggerEventsHandler.js';
import { DAY_IN_MINUTES, DEFAULT_EVENTS } from './utils/constants.js';

// EXPOSE TO BROWSER
if (typeof window !== 'undefined') {
    window['DateTriggerEventsHandler'] = DateTriggerEventsHandler;
    window['DateTriggerEvent'] = DateTriggerEvent;
    window['DAY_IN_MINUTES'] = DAY_IN_MINUTES;
    window['DEFAULT_EVENTS'] = DEFAULT_EVENTS;
}

export { DateTriggerEventsHandler, DateTriggerEvent, DAY_IN_MINUTES, DEFAULT_EVENTS };
