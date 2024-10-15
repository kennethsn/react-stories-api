import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import { Else, If, Then } from 'react-if';

import type { Icon as IconType } from '../../../types';
import Icon from '../Icon/Icon';
import styles from './TimelineEventDot.styles';
import type { TimelineEventDotProps } from './TimelineEventDot.types';

export default function TimelineEventDot({ color, event }: TimelineEventDotProps) {
  const { dot } = event;
  let icon: IconType | undefined;
  let text;
  if (!dot) {
    icon = { name: 'event', type: 'mui' };
  } else if ('icon' in dot) {
    icon = dot.icon;
  } else {
    text = dot.text;
  }

  return (
    <TimelineDot
      sx={styles.dot(color.background)}
      variant="outlined"
    >
      <If condition={!!icon}>
        <Then>
          <Icon
            icon={icon!}
            sx={styles.icon}
          />
        </Then>

        <Else>
          <Typography
            variant="body2"
          >
            {text ?? event.date.year}
          </Typography>
        </Else>
      </If>
    </TimelineDot>
  );
}
