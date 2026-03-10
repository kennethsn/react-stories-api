import type { SxProps, Theme } from '@mui/material';
import type { PropsWithChildren } from 'react';

export type TypographyBadgeProps = PropsWithChildren & {
  readonly className?: string;
  readonly color?: 'primary' | 'secondary';
  readonly sx?: SxProps<Theme>;
  readonly textSx?: SxProps<Theme>;
};
