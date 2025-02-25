import type { SxProps } from '@mui/material/styles';

export type PreviewableImageProps = {
  alt: string;
  className?: string;
  onClick?: () => void;
  src: string;
  sx?: SxProps;
};
