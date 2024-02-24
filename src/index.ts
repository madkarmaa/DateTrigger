import { DateTriggerEvent } from './utils/dateTriggerEvent.js';
import { DateTriggerEventHandler } from './utils/dateTriggerEventHandler.js';
import { DAY_IN_MINUTES } from './utils/constants.js';

// EXPOSE TO BROWSER
if (typeof window !== 'undefined') {
    // https://stackoverflow.com/a/38964459
    (window as any)['DateTriggerEventHandler'] = DateTriggerEventHandler;
    (window as any)['DateTriggerEvent'] = DateTriggerEvent;
    (window as any)['DAY_IN_MINUTES'] = DAY_IN_MINUTES;
}

export * from './utils/constants.js';
export * from './utils/dateTriggerEventHandler.js';
export * from './utils/dateTriggerEvent.js';
