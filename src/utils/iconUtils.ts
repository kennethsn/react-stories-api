import type {
  Icon,
  ImageIcon,
  MuiIcon,
  NoIcon,
} from '../types';

export const buildNoIcon = (): NoIcon => ({ type: 'none' });

export const isImageIcon = (icon: Icon): icon is ImageIcon => icon.type === 'image';

export const isMuiIcon = (icon: Icon): icon is MuiIcon => icon.type === 'mui';

// Note: this is used to ensure fallbacks are intentionally skipped
export const isNoIcon = (icon: Icon): icon is NoIcon => icon.type === 'none';
