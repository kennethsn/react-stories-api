import type { TimelineDirection, TimelinePosition, TimelineProps } from '../components/UI/Timeline/Timeline.types';

const asKeyPart = (value: unknown) => {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  if (value && typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch {
      return '';
    }
  }

  return '';
};

export const getTimelineEventDirection = (
  index: number,
  position: TimelinePosition,
): TimelineDirection => ((position === 'right' || index % 2 === 0) ? 'right' : 'left');

export const getTimelineEventKey = (event: TimelineProps['events'][number], index: number) => {
  const idKey = asKeyPart(event.id);
  if (idKey) {
    return `${idKey}-${index}`;
  }
  const dateKey = [event.date.year, event.date.month, event.date.day, asKeyPart(event.date.label)]
    .filter((value) => value !== undefined && value !== '')
    .join('-');
  const titleKey = asKeyPart(event.title);
  const imageKey = event.image?.url ?? '';
  return [dateKey, titleKey, imageKey, index].filter(Boolean).join('-');
};
