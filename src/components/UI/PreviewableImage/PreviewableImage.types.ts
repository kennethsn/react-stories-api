import type { SxProps } from '@mui/material/styles';
import type { ReactNode } from 'react';
import type { OverlayRenderProps } from 'react-photo-view/dist/types';

export type PreviewableImageProps = {
  readonly alt: string;
  readonly caption?: ReactNode;
  readonly className?: string;
  readonly onClick?: () => void;
  readonly src: string;
  readonly sx?: SxProps;
};

export type PreviewableImageToolbarProps = OverlayRenderProps & {
  readonly caption?: ReactNode;
};
