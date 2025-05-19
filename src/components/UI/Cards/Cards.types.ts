import type { SxProps } from '@mui/material/styles';
import type { PropsWithChildren, ReactNode } from 'react';

import type { Caption, CardsLayout } from '../../../types';

export type CardsItemProps = PropsWithChildren & {
  readonly caption?: Caption;
  readonly disableAnimation?: boolean;
  readonly sx?: SxProps;
};

export type CardsLayoutProps = CardsProps & {
  readonly keyFn: (index: number) => string;
  readonly layout: CardsLayout;
};

export type CardsProps = {
  readonly activeItem?: ReactNode;
  readonly children: ReactNode[];
  readonly disableAnimation?: boolean;
  readonly itemSx?: SxProps;
  readonly keyFn?: (index: number) => string;
  readonly layout?: CardsLayout;
  readonly onChange?: (index: number) => void;
  readonly overrideTotalCount?: number; // Used for layouts with pagination
  readonly sx?: SxProps;
};
