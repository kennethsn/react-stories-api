import { observer } from 'mobx-react-lite';

import useColor from '../../../hooks/useColor';
import useStoryTheme from '../../../hooks/useStoryTheme';
import StoryMomentTypography from '../../StoryMoment/StoryMomentTypography';
import Timeline from '../../UI/Timeline/Timeline';
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

  return (
    <BaseMoment
      contentFit={moment.fit}
      contentSize={moment.size}
      moment={moment}
    >
      <Timeline
        color={color}
        events={moment.events.map((event, index) => ({
          ...event,
          date: {
            ...event.date,
            label: (
              <StoryMomentTypography
                color="text.secondary"
                field={`data.timeline.events.${index}.date.label`}
                moment={moment}
                variant="h5"
              />
            ),
          },
          description: (
            <StoryMomentTypography
              field={`data.timeline.events.${index}.description`}
              moment={moment}
              richText
              variant="caption"
            />
          ),
          title: (
            <StoryMomentTypography
              color="inherit"
              field={`data.timeline.events.${index}.title`}
              moment={moment}
              richText
              variant="h6"
            />
          ),
        }))}
        imageMaxHeight={imageMaxHeight}
        position={position}
      />
    </BaseMoment>
  );
});

export default TimelineMoment;
