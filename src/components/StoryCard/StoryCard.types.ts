import type { SxProps } from '@mui/system';
import type { PropsWithChildren } from 'react';

import type { Button, StoryOrSummary } from '../../types';

export type StoryCardContainerProps = PropsWithChildren & {
  readonly button: Button;
  readonly sx?: SxProps;
};

export type StoryCardProps = {
  readonly buttonLabel?: string;
  readonly isHidingButton?: boolean;
  readonly previewButtonLabel?: string;
  readonly story: StoryOrSummary;
  readonly sx?: SxProps;
};
