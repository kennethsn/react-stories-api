import type { GridSize } from '@mui/material/Grid2';
import type { ReactNode } from 'react';

import type { Moment, MomentContentFit, MomentContentSize } from '../../types';

export type MomentBodyLayoutProps = {
  readonly children: ReactNode;
  readonly contentFit?: MomentContentFit;
  readonly contentSize?: MomentContentSize;
  readonly moment: Moment;
};

export type MomentBodyLayoutCaptionGridItemProps = {
  readonly boxShadow: number;
  readonly content?: string;
  readonly height?: string;
  readonly hide: boolean;
  readonly size: GridSize;
  readonly m: number;
};

export type MomentBodyLayoutContentGridItemProps = {
  readonly borderRadius: number;
  readonly boxShadow: number;
  readonly children: ReactNode;
  readonly display: 'block' | 'flex';
  readonly height?: string;
  readonly maxHeight?: string;
  readonly maxWidth?: string;
  readonly p: number;
  readonly size: GridSize;
};
