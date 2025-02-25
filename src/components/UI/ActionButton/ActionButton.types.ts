import type { IconButtonProps } from '@mui/material/IconButton';
import type SvgIcon from '@mui/material/SvgIcon';

export type ActionButtonProps = Omit<IconButtonProps, 'children'> & {
  readonly icon: typeof SvgIcon;
  readonly isDisabled?: boolean;
  readonly isFailed?: boolean;
  readonly isHidden?: boolean;
  readonly isLoading?: boolean;
  readonly isSuccessful?: boolean;
  readonly title?: string;
  readonly to?: string;
};
