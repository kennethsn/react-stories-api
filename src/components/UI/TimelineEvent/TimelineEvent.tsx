import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Typography from '@mui/material/Typography';
import { When } from 'react-if';

import Animation from '../Animation/Animation';
import TimelineEventCard from '../TimelineEventCard/TimelineEventCard';
import TimelineEventDot from '../TimelineEventDot/TimelineEventDot';
import styles from './TimelineEvent.styles';
import type { TimelineEventProps } from './TimelineEvent.types';

export default function TimelineEvent({
  color,
  direction,
  event,
  imageMaxHeight,
  timelinePosition,
}: TimelineEventProps) {
  const timelineIsRight = timelinePosition === 'right';
  const animation = direction === 'left' ? 'fadeDownLeft' : 'fadeDownRight';
  const label = (
    <Animation animation={timelineIsRight ? 'fadeDown' : animation}>
      {event.date.label}
    </Animation>
  );
  return (
    <TimelineItem sx={styles.root}>
      {timelinePosition === 'alternate' && (
        <TimelineOppositeContent
          color="text.secondary"
          justifyContent={direction === 'right' ? 'flex-end' : 'flex-start'}
          sx={styles.oppositeContent}
          variant="h5"
        >
          {label}
        </TimelineOppositeContent>
      )}

      <TimelineSeparator>
        <TimelineConnector />

        <TimelineEventDot
          color={color}
          event={event}
        />

        <TimelineConnector />
      </TimelineSeparator>

      <TimelineContent sx={styles.content}>
        <When condition={timelineIsRight}>
          <Typography
            color="text.secondary"
            sx={styles.contentLabel}
            variant="h5"
          >
            {label}
          </Typography>
        </When>

        <TimelineEventCard
          color={color}
          direction={direction}
          event={event}
          imageMaxHeight={imageMaxHeight}
        />
      </TimelineContent>
    </TimelineItem>
  );
}
