import type { Color } from '../../../types';
import type { TimelineEventComponent } from '../TimelineEvent/TimelineEvent.types';

export type TimelineDirection = 'left' | 'right';

export type TimelinePosition = 'alternate' | 'right';

export type TimelineProps = {
  readonly color: Color;
  readonly events: TimelineEventComponent[];
  readonly imageMaxHeight?: number;
  readonly position?: TimelinePosition;
};
