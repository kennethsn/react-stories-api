import type { Color } from '../../../types';
import type { TimelineEventComponent } from '../TimelineEvent/TimelineEvent.types';

export type TimelineEventDotProps = {
  readonly color: Color;
  readonly event: TimelineEventComponent;
};
