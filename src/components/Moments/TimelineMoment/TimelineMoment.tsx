import Timeline from '@mui/lab/Timeline';

import { MOMENT_LAYOUT_MAX_CONTENT_SIZE as maxContentSize } from '../../../constants';
import { useColor, useMoments, useStory } from '../../../hooks';
import TimelineEvent from '../../UI/TimelineEvent/TimelineEvent';
import BaseMoment from '../BaseMoment/BaseMoment';
import type { TimelineMomentProps } from './TimelineMoment.types';
// KSN TODO: add a defaults payload for fit & sizes to the momentConfig
// KSN TODO: add text alignment to the momentConfig and caption UX
// KSN TODO: timeline moment to support button clicks to other moments or other story+moment

export default function TimelineMoment({ moment }: TimelineMomentProps) {
  const color = useColor(moment.color);
  const { layoutIsMobile } = useStory();
  const { getRelativeMomentHeight } = useMoments();
  const { data: { fit = 'full', size = maxContentSize, timeline: { events } } } = moment;
  const imageMaxHeight = getRelativeMomentHeight(0.8);
  const position = layoutIsMobile ? 'right' : 'alternate';
  const getEventDirection = (index: number) => (
    (position === 'right' || index % 2 === 0) ? 'right' : 'left'
  );
  return (
    <BaseMoment
      contentFit={fit}
      contentSize={size}
      moment={moment}
    >
      <Timeline position={position}>
        {events.map((event, index) => (
          <TimelineEvent
            key={`${event.date.label}-${event.title}`}
            color={color}
            direction={getEventDirection(index)}
            event={event}
            imageMaxHeight={imageMaxHeight}
            timelinePosition={position}
          />
        ))}
      </Timeline>
    </BaseMoment>
  );
}
