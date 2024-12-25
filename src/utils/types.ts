export type Period = { from: Date; to: Date };

export type DateEvent = {
    name: string;
    period: Period;
    execute: () => void;
};
