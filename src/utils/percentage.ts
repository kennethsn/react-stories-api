export const toPercentage = (value: number): number => value * 100;

export const toPercentageString = (value: number): string => `${toPercentage(value)}%`;
