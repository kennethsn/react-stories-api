import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { When } from 'react-if';

import StoryButton from '../../StoryButton/StoryButton';
import Animation from '../Animation/Animation';
import PreviewableImage from '../PreviewableImage/PreviewableImage';
import styles from './TimelineEventCard.styles';
import type { TimelineEventCardProps } from './TimelineEventCard.types';

export default function TimelineEventCard({
  color,
  direction,
  event,
  imageMaxHeight,
}: TimelineEventCardProps) {
  const {
    button,
    description,
    image,
    title,
  } = event;
  const animation = direction === 'left' ? 'fadeUpRight' : 'fadeUpLeft';
  const imageAlt = image?.alt;
  const imagePosition = image?.position ?? '50% 20%';
  const imageSrc = image?.url;
  const showButton = !!button;
  const showDescription = !!description;
  const showImage = !!imageSrc;
  return (
    <Animation animation={animation}>
      <Box sx={styles.contentCard}>
        <When condition={showImage}>
          <PreviewableImage
            alt={imageAlt!}
            src={imageSrc!}
            sx={styles.image(imageMaxHeight, imagePosition)}
          />
        </When>

        <Typography
          color={color.background}
          sx={styles.title}
          variant="h6"
        >
          {title}
        </Typography>

        <When condition={showDescription}>
          <Typography
            component="div"
            sx={styles.description}
            variant="caption"
          >
            {description}
          </Typography>
        </When>

        <When condition={showButton}>
          <StoryButton
            button={button!}
            size="small"
            sx={styles.button(color.background)}
            variant="outlined"
          />
        </When>
      </Box>
    </Animation>
  );
}
