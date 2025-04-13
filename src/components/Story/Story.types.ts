import type { SxProps } from '@mui/material/styles';
import type { PropsWithChildren } from 'react';

import type { StoryStoreOptions } from '../../state/storyStore';
import type { Story } from '../../types';

export type StoryProps = Omit<StoryStoreOptions, 'story'> & {
  readonly story?: Story;
  readonly sx?: SxProps;
};

export type StoryWrapperProps = PropsWithChildren & StoryProps;
