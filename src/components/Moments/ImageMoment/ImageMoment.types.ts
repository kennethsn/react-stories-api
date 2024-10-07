import type { GridSize } from '@mui/material/Grid2';
import type { SxProps } from '@mui/material/styles';

import type { ImageMomentData } from '../../../types';
import type { BaseMomentPropsWithouChildren } from '../BaseMoment/BaseMoment.types';

export type ImageMomentProps = BaseMomentPropsWithouChildren<ImageMomentData>;

export type ImageMomentCaptionGridItemProps = {
  boxShadow: number;
  content?: string;
  height?: string;
  hide: boolean;
  size: GridSize;
  m: number;
};

export type ImageMomentImageGridItemProps = {
  alt: string;
  boxSx: SxProps
  display: 'block' | 'flex';
  height?: string;
  maxHeight?: string;
  maxWidth?: string;
  p: number;
  size: GridSize;
  src: string;
};
