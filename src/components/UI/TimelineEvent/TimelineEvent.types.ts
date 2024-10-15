import type { Color, TimelineEvent } from '../../../types';

export type TimelineEventProps = {
  color: Color;
  direction: 'left' | 'right';
  event: TimelineEvent;
  imageMaxHeight: number;
  timelinePosition: 'alternate' | 'right';
};
