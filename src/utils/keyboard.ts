import type { KeyboardEvent } from 'react';

export const isEnter = (e: KeyboardEvent) => e.key === 'Enter';

export const isEnterWithoutShift = (e: KeyboardEvent) => isEnter(e) && !e.shiftKey;
