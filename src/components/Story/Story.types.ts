import type { PropsWithChildren } from 'react';

import type { StoryStoreOptions } from '../../state/storyStore';

export type StoryProps = StoryStoreOptions;

export type StoryWrapperProps = PropsWithChildren & StoryProps;
