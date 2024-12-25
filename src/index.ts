import EventsHandler from './utils/eventsHandler';
import { getEasterDateOfYear, sameDay } from './utils/utils';

// EXPOSE TO BROWSER
if (typeof window !== 'undefined') {
    // https://stackoverflow.com/a/38964459
    (window as any)['EventsHandler'] = EventsHandler;
    (window as any)['getEasterDateOfYear'] = getEasterDateOfYear;
    (window as any)['sameDay'] = sameDay;
}

export { EventsHandler, getEasterDateOfYear, sameDay };
export * from './utils/types';
