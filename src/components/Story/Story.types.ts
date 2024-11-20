import type { PropsWithChildren, ReactNode } from 'react';

import type { Story } from '../../types';

export type StoryProps = {
  readonly branding?: ReactNode;
  readonly defaultMoment?: number;
  readonly layout?: 'desktop' | 'mobile';
  readonly onChange?: (active: number) => void;
  readonly story: Story;
};

export type StoryWrapperProps = PropsWithChildren & StoryProps;
