import type { SxProps } from '@mui/system';
import type { PropsWithChildren, ReactNode } from 'react';

import type { Button, StoryOrSummary } from '../../types';

export type StoryCardContainerProps = PropsWithChildren & {
  readonly button: Button;
  readonly sx?: SxProps;
};

export type StoryCardProps = {
  readonly buttonLabel?: string;
  readonly isDisabled?: boolean | undefined;
  readonly isHidingButton?: boolean;
  readonly previewButtonLabel?: string;
  readonly slot?: ReactNode;
  readonly story: StoryOrSummary;
  readonly sx?: SxProps;
};
