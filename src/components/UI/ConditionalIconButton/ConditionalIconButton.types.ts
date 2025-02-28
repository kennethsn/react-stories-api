import type { IconButtonProps } from '@mui/material/IconButton';

export type ConditionalIconButtonProps = IconButtonProps & {
  readonly condition: boolean;
  readonly falseIcon: React.ReactNode;
  readonly trueIcon: React.ReactNode;
};
