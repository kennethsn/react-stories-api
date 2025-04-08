import type { SxProps } from '@mui/material/styles';

export type PreviewableImageProps = {
  readonly alt: string;
  readonly className?: string;
  readonly onClick?: () => void;
  readonly src: string;
  readonly sx?: SxProps;
};
