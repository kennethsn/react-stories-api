import type { SxProps, Theme } from '@mui/material';
import type { PropsWithChildren } from 'react';

export type ContainerBadgeProps = PropsWithChildren & {
  readonly color?: 'primary' | 'secondary';
  readonly offset?: number;
  readonly direction?: 'left' | 'right';
  readonly sx?: SxProps<Theme>;
};
