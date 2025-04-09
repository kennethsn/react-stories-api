import Timeline from '@mui/lab/Timeline';
import { observer } from 'mobx-react-lite';

import useColor from '../../../hooks/useColor';
import useStoryTheme from '../../../hooks/useStoryTheme';
import TimelineEvent from '../../UI/TimelineEvent/TimelineEvent';
import BaseMoment from '../BaseMoment/BaseMoment';
import type { TimelineMomentProps } from './TimelineMoment.types';
// KSN TODO: add text alignment to the momentConfig and caption UX

const TimelineMoment = observer(({ moment }: TimelineMomentProps) => {
  const color = useColor(moment.color);
  const { layoutIsMobile } = useStoryTheme();
  // TODO: relative height is no longer working
  // const imageMaxHeight = moment.getRelativeHeight(0.8);
  const imageMaxHeight = '40vh' as unknown as number;
  const position = layoutIsMobile ? 'right' : 'alternate';
  const getEventDirection = (index: number) => (
    (position === 'right' || index % 2 === 0) ? 'right' : 'left'
  );
  return (
    <BaseMoment
      contentFit={moment.fit}
      contentSize={moment.size}
      moment={moment}
    >
      <Timeline position={position}>
        {moment.events.map((event, index) => (
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
});

export default TimelineMoment;
