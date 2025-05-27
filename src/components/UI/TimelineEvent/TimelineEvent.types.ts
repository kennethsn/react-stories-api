import type { ReactNode } from 'react';

import type { Color, TimelineEvent } from '../../../types';

export type TimelineEventComponent = Omit<TimelineEvent, 'date' | 'description' | 'title'> & {
  readonly date: Omit<TimelineEvent['date'], 'label'> & {
    readonly label: ReactNode | string;
  }
  readonly description: ReactNode | string;
  readonly title: ReactNode | string;
};

export type TimelineEventProps = {
  readonly color: Color;
  readonly direction: 'left' | 'right';
  readonly event: TimelineEventComponent
  readonly imageMaxHeight: number;
  readonly timelinePosition: 'alternate' | 'right';
};
