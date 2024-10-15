import type { GridSize } from '@mui/material/Grid2';

import {
  MOMENT_LAYOUT_DEFAULT_CONTENT_SIZE as defaultContentSize,
  MOMENT_LAYOUT_MAX_CONTENT_SIZE as maxContentSize,
} from '../constants';
import type { MomentCaptionPosition, MomentContentFit, MomentContentSize } from '../types';
import { toPercentageString } from './percentage';

export const getGridItemHeights = (
  inputContentSize: MomentContentSize | undefined,
  contentFit: MomentContentFit | undefined,
  captionPosition: MomentCaptionPosition | undefined,
  layoutIsHorizontal: boolean,
  layoutIsMobile: boolean,
  hasCaption: boolean,
): { caption: string | undefined, content: string | undefined } => {
  if (contentFit === 'cover' && (captionPosition === 'top' || captionPosition === 'bottom')) {
    const contentSize = !hasCaption ? 1 : (
      (inputContentSize || defaultContentSize) / maxContentSize
    );
    const captionSize = 1 - contentSize;
    return { caption: toPercentageString(captionSize), content: toPercentageString(contentSize) };
  }
  if (layoutIsHorizontal) {
    return { caption: '100%', content: '100%' };
  }
  if (contentFit === 'card' && !layoutIsMobile) {
    return { caption: undefined, content: '100%' };
  }
  return { caption: undefined, content: undefined };
};

export const getGridItemSizes = (
  inputContentSize: MomentContentSize | undefined,
  hasCaption: boolean,
  layoutIsHorizontal: boolean,
  layoutIsMobile: boolean,
): { caption: GridSize, content: GridSize } => {
  if (layoutIsMobile || !hasCaption) {
    return { caption: maxContentSize, content: maxContentSize };
  }
  if (layoutIsHorizontal) {
    const content = inputContentSize || defaultContentSize;
    return { caption: maxContentSize - content, content };
  }
  return { caption: maxContentSize, content: maxContentSize };
};
