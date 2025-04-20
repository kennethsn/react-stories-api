import type { SxProps } from '@mui/material/styles';
import type { ReactNode } from 'react';

import type { CardsLayout } from '../../../types';

export type CardsProps = {
  readonly children: readonly ReactNode[];
  readonly disableAnimation?: boolean;
  readonly keyFn?: (index: number) => string;
  readonly layout?: CardsLayout;
  readonly overrideTotalCount?: number; // Used for layouts with pagination
  readonly sx?: SxProps;
};

export type CardsLayoutProps = CardsProps & {
  readonly keyFn: (index: number) => string;
  readonly layout: CardsLayout;
};
