import type { PropsWithChildren } from 'react';

import type { StoryStoreOptions } from '../../state/storyStore';
import type { Story } from '../../types';

export type StoryProps = Omit<StoryStoreOptions, 'story'> & {
  readonly story?: Story;
};

export type StoryWrapperProps = PropsWithChildren & StoryProps;
