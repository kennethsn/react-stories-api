import type { RefObject } from 'react';

import { getRelativeValue } from './math';

export const getElementHeight = (ref: RefObject<HTMLDivElement> | null) => (
  ref?.current?.clientHeight || 0
);

export const getRelativeHeight = (
  ref: RefObject<HTMLDivElement> | null,
  value: number,
  algorithm?: 'absolute' | 'percentage',
) => {
  const height = getElementHeight(ref);
  return getRelativeValue(height, value, algorithm);
};
