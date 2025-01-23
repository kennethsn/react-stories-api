import type { ButtonProps } from '@mui/material/Button';
import type SvgIcon from '@mui/material/SvgIcon';

export type ActionButtonProps = {
  readonly color?: ButtonProps['color'];
  readonly icon: typeof SvgIcon;
  readonly isDisabled?: boolean;
  readonly isHidden?: boolean;
  readonly isLoading?: boolean;
  readonly isSuccessful?: boolean;
  readonly onClick: () => void;
  readonly title?: string;
};
