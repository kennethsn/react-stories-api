import type { Color, TimelineEvent } from '../../../types';

export type TimelineEventCardProps = {
  color: Color;
  direction: 'left' | 'right';
  event: TimelineEvent;
  imageMaxHeight: number;
};
