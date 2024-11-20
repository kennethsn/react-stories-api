import type { SxProps } from '@mui/system';

import type { StorySummary } from '../../types';

export type StoryCardProps = {
  readonly buttonLabel?: string;
  readonly isHidingButton?: boolean;
  readonly story: StorySummary;
  readonly sx?: SxProps;
};
