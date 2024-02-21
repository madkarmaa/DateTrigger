import { EventBuilder } from './utils/eventBuilder.js';
import { EventsHandler } from './utils/eventsHandler.js';
import { DAY_IN_MINUTES, DEFAULT_EVENTS } from './utils/constants.js';

// EXPOSE TO BROWSER
if (typeof window !== 'undefined') {
    window['EventsHandler'] = EventsHandler;
    window['EventBuilder'] = EventBuilder;
    window['DAY_IN_MINUTES'] = DAY_IN_MINUTES;
    window['DEFAULT_EVENTS'] = DEFAULT_EVENTS;
}

export { EventsHandler, EventBuilder, DAY_IN_MINUTES, DEFAULT_EVENTS };
