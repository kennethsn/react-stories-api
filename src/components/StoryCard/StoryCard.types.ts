import type { SxProps } from '@mui/material/styles';
import type { PropsWithChildren, ReactNode } from 'react';

import type { Button, StoryIdAction, StoryOrSummary } from '../../types';

export type StoryCardContainerProps = PropsWithChildren & {
  readonly button: Button;
  readonly sx?: SxProps;
};

export type StoryCardProps = {
  readonly badgeSx?: SxProps;
  readonly buttonLabel?: string;
  readonly isDisabled?: boolean | undefined;
  readonly isHidingButton?: boolean;
  readonly newTab?: Button['new_tab'];
  readonly previewButtonLabel?: string;
  readonly showStoryId?: boolean;
  readonly slot?: ReactNode;
  readonly story: StoryOrSummary;
  readonly storyIdActions?: StoryIdAction[];
  readonly sx?: SxProps;
};
