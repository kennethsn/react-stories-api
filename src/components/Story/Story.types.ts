import { ReactNode } from 'react';

import type { Story } from '../../types';

export type StoryProps = {
  branding?: ReactNode;
  defaultMoment?: number;
  layout?: 'desktop' | 'mobile';
  onChange?: (active: number) => void;
  story: Story;
};
