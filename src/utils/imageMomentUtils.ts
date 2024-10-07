import type { GridSize } from '@mui/material/Grid2';

import {
  MOMENT_IMAGE_DEFAULT_IMAGE_SIZE as defaultImageSize,
  MOMENT_IMAGE_MAX_IMAGE_SIZE as maxImageSize,
} from '../constants';
import type { ImageCaptionPosition, ImageFit, ImageSize } from '../types';
import { toPercentageString } from './percentage';

export const getGridItemHeights = (
  inputImageSize: ImageSize | undefined,
  imageFit: ImageFit | undefined,
  captionPosition: ImageCaptionPosition | undefined,
  layoutIsHorizontal: boolean,
  layoutIsMobile: boolean,
  hasCaption: boolean,
): { caption: string | undefined, image: string | undefined } => {
  if (imageFit === 'cover' && (captionPosition === 'top' || captionPosition === 'bottom')) {
    const imageSize = (hasCaption ? ((inputImageSize || defaultImageSize) / maxImageSize) : 1);
    const captionSize = 1 - imageSize;
    return { caption: toPercentageString(captionSize), image: toPercentageString(imageSize) };
  }
  if (layoutIsHorizontal) {
    return { caption: '100%', image: '100%' };
  }
  if (imageFit === 'card' && !layoutIsMobile) {
    return { caption: undefined, image: '100%' };
  }
  return { caption: undefined, image: undefined };
};

export const getGridItemSizes = (
  inputImageSize: ImageSize | undefined,
  hasCaption: boolean,
  layoutIsHorizontal: boolean,
  layoutIsMobile: boolean,
): { caption: GridSize, image: GridSize } => {
  if (layoutIsMobile || !hasCaption) {
    return { caption: maxImageSize, image: maxImageSize };
  }
  if (layoutIsHorizontal) {
    const image = inputImageSize || defaultImageSize;
    return { caption: maxImageSize - image, image };
  }
  return { caption: maxImageSize, image: maxImageSize };
};
