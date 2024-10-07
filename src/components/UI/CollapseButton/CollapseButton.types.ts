import type { SxProps } from '@mui/material/styles';

export type CollapseButtonProps = {
  collapsed: boolean;
  onClick: (collapsed: boolean) => void;
  showOnHover?: boolean;
  sx?: SxProps
};
