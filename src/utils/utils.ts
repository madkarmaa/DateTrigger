import type { Period, DateEvent } from './types';

export const isDateInPeriod = (date: Date, period: Period): boolean => {
    return date >= period.from && date <= period.to;
};

export const sameDay = (date: Date): Period => {
    return { from: date, to: date };
};

export const getEasterDateOfYear = (year: number): Date => {
    const a = year % 19,
        b = Math.floor(year / 100),
        c = year % 100,
        d = Math.floor(b / 4),
        e = b % 4,
        f = Math.floor((b + 8) / 25),
        g = Math.floor((b - f + 1) / 3),
        h = (19 * a + b - d - g + 15) % 30,
        i = Math.floor(c / 4),
        k = c % 4,
        L = (32 + 2 * e + 2 * i - h - k) % 7,
        m = Math.floor((a + 11 * h + 22 * L) / 451),
        month = Math.floor((h + L - 7 * m + 114) / 31),
        day = ((h + L - 7 * m + 114) % 31) + 1;
    return new Date(year, month - 1, day);
};

export function assertIsPeriod(value: unknown): asserts value is Period {
    if (
        !value ||
        typeof value !== 'object' ||
        !(value as Period).from ||
        !((value as Period).from instanceof Date) ||
        !(value as Period).to ||
        !((value as Period).to instanceof Date)
    )
        throw new Error('Expected a Period object');
}

export function assertIsDateEvent(value: unknown): asserts value is DateEvent {
    if (
        !value ||
        typeof value !== 'object' ||
        !(value as DateEvent).name ||
        typeof (value as DateEvent).name !== 'string' ||
        !(value as DateEvent).period ||
        !(value as DateEvent).execute ||
        typeof (value as DateEvent).execute !== 'function'
    )
        throw new Error('Expected a DateEvent object');

    // https://stackoverflow.com/a/72689922
    assertIsPeriod((value as DateEvent).period);
}
