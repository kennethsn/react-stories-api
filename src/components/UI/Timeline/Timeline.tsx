import MuiTimeline from '@mui/lab/Timeline';
import { observer } from 'mobx-react-lite';

import { getTimelineEventDirection, getTimelineEventKey } from '../../../utils/timelineUtils';
import TimelineEvent from '../TimelineEvent/TimelineEvent';
import type { TimelineProps } from './Timeline.types';

const Timeline = observer(({
  color,
  events,
  imageMaxHeight = 400,
  position = 'alternate',
}: TimelineProps) => (
  <MuiTimeline position={position}>
    {events.map((event, index) => (
      <TimelineEvent
        key={getTimelineEventKey(event, index)}
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
