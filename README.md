# DateTrigger

A simple JavaScript library to execute code on specific dates

> [!NOTE]
>
> This library is **fully** compatible with browsers

## ⚙️ Installation

**NodeJS**:

```
npm install datetrigger
```

**Browser**:

```html
<!-- type="module" is required, and 'defer' is also required if you want to interact with the DOM! -->
<script src="https://unpkg.com/datetrigger/web/core.js" type="module" defer></script>
```

## ❓ How to

**NodeJS**: once the package is installed, you can import the library

```js
import { EventsHandler } from 'datetrigger';
```

**Browser**: you don't need to import anything, the library will expose itself to the `window` object and will be globally accessible

### Basic usage

```js
new EventsHandler();
```

...and that's it!

### Create custom events

```js
import { EventsHandler } from 'datetrigger';

const myEvents = [
    {
        // The first property is the name of the event, of type string.
        name: 'my custom event',
        // The second property is the period of time in which the event will be triggered.
        // It's of type Period, which is an object with 2 properties, "from" and "to".
        // The following example will make the event execute for the whole month of January 2025.
        period: {
            // Why is the month 0? Because JavaScript counts months from 0 to 11.
            from: new Date(2025, 0, 1),
            // By how JavaScript handles dates, "to" is exclusive.
            // meaning that, in the following example, the event will NOT run on the 1st of February.
            to: new Date(2025, 1, 1),
        },
        // The third property is a function which will be called during the duration of the event.
        // In this case, it will simply log a message to the console.
        execute: () => {
            console.log('Hello there!');
        },
    },
    // Add as many events as you want, and they can even be executed at the same time!
];

// After you're done, pass the array to the EventsHandler class.
// The events handler also has another parameter, "verbose",
// which, if set to true, will console.log the name of the event that executes.
new EventsHandler(myEvents, true);
// That's it!
```
