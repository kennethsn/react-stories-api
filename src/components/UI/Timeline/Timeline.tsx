import MuiTimeline from '@mui/lab/Timeline';
import { observer } from 'mobx-react-lite';

import TimelineEvent from '../TimelineEvent/TimelineEvent';
import type { TimelineDirection, TimelinePosition, TimelineProps } from './Timeline.types';

const getTimelineEventDirection = (
  index: number,
  position: TimelinePosition,
): TimelineDirection => ((position === 'right' || index % 2 === 0) ? 'right' : 'left');

const Timeline = observer(({
  color,
  events,
  imageMaxHeight = 400,
  position = 'alternate',
}: TimelineProps) => (
  <MuiTimeline position={position}>
    {events.map((event, index) => (
      <TimelineEvent
        key={`${event.date.label}-${event.title}`}
        color={color}
        direction={getTimelineEventDirection(index, position)}
        event={event}
        imageMaxHeight={imageMaxHeight}
        timelinePosition={position}
      />
    ))}
  </MuiTimeline>
));

export default Timeline;
