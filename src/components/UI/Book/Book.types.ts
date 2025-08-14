import type { SxProps } from '@mui/material/styles';

export type BookProps = {
  readonly accentColor?: string;
  readonly author?: string;
  readonly coverColor?: string;
  readonly description?: string;
  readonly onClick?: () => void;
  readonly subtitle?: string;
  readonly sx?: SxProps;
  readonly textColor?: string;
  readonly title: string;
};
