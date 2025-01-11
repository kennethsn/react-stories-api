import type { PropsWithChildren, ReactNode } from 'react';

import type { Story } from '../../types';

export type StoryProps = {
  readonly branding?: ReactNode;
  readonly connectRouter?: boolean;
  readonly defaultMoment?: number;
  readonly fullscreen?: boolean;
  readonly layout?: 'desktop' | 'mobile';
  readonly onChange?: (active: number) => void;
  readonly story: Story;
};

export type StoryWrapperProps = PropsWithChildren & StoryProps;
