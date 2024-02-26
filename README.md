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
<!-- type="module" and 'defer' are required! -->
<script src="https://unpkg.com/datetrigger/web/core.js" type="module" defer></script>
```

## ❓ How to

**NodeJS**: once the package is installed, you can import the library

```js
import { DateTriggerEventsHandler, DateTriggerEvent } from 'datetrigger';
```

**Browser**: you don't need to import anything, the library will expose itself to the `window` object and will be globally accessible

### Basic usage

```js
// The 'DOMContentLoaded' event listener is required or else the library will not be exposed to the window object yet
document.addEventListener('DOMContentLoaded', () => {
    new DateTriggerEventHandler();
});
```

...and that's it!

### Create custom events

```js
const myEvents = [
    // DateTriggerEvent is a helper class for creating custom events, it has 3 parameters
    new DateTriggerEvent(
        // The first parameter is of type Date, and it represents
        // when the event should start. In this case, it will start...
        // right now!
        new Date(),
        // The second parameter is a number, and it represents
        // the duration of the event in MINUTES. In this case,
        // it will last for 10 minutes
        10,
        // The third parameter is a function which will be called
        // during the duration of the event. In this case, it will
        // simply log a message to the console
        () => {
            console.log('Hello there!');
        }
    ),
    // Add as many events as you want, and they can even be executed at the same time!
];

// After you're done, pass the array to the DateTriggerEventsHandler class
new DateTriggerEventsHandler(myEvents);
// That's it!
```
