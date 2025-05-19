import type { Color } from '../../../types';
import type { TimelineEventComponent } from '../TimelineEvent/TimelineEvent.types';

export type TimelineEventCardProps = {
  readonly color: Color;
  readonly direction: 'left' | 'right';
  readonly event: TimelineEventComponent;
  readonly imageMaxHeight: number;
};
