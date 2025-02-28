import type { SvgIconComponent } from '@mui/icons-material';
import type { PropsWithChildren } from 'react';

export type StatusPageProps = PropsWithChildren & {
  readonly iconComponent?: SvgIconComponent;
  readonly isLoading?: boolean;
  readonly isFullscreen?: boolean;
  readonly message?: string;
};
