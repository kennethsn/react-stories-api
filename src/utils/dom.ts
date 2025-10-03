import type { RefObject, SyntheticEvent } from 'react';

import { getRelativeValue } from './math';

export const classNames = (...classes: (string | undefined)[]) => (
  classes.filter(Boolean).join(' ')
);

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

export const setPageTitle = (document: Document, title: string) => {
  // eslint-disable-next-line no-param-reassign
  document.title = title;
};

export const stopEventPropagation = (event: SyntheticEvent) => {
  event.stopPropagation();
};
