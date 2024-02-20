// https://github.com/ReVanced/revanced-website/issues/226

import { EventBuilder } from './utils/eventBuilder.js';
import { EventThemeChanger } from './utils/eventThemeChanger.js';
import { DAY_IN_MINUTES, DEFAULT_EVENTS } from './utils/constants.js';

// https://github.com/revanced/revanced-website/blob/main/src/app.scss#L36

if (typeof window !== 'undefined') {
    window['EventThemeChanger'] = EventThemeChanger;
    window['EventBuilder'] = EventBuilder;
    window['DAY_IN_MINUTES'] = DAY_IN_MINUTES;
    window['DEFAULT_EVENTS'] = DEFAULT_EVENTS;
}

export { EventThemeChanger, EventBuilder, DAY_IN_MINUTES, DEFAULT_EVENTS };
