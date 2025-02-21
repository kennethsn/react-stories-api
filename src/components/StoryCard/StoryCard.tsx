import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Unless, When } from 'react-if';

import type { Button } from '../../types';
import { isStoryPreviewing } from '../../utils';
import { StoriesAPIButton } from '../StoriesAPIButton';
import styles from './StoryCard.styles';
import type { StoryCardProps } from './StoryCard.types';
import StoryCardContainer from './StoryCardContainer';

export default function StoryCard({
  buttonLabel = 'View Story', // KSN TODO: connect this to formatters
  isHidingButton = false,
  previewButtonLabel = 'Coming Soon', // KSN TODO: connect this to formatters
  slot,
  story,
  sx,
}: StoryCardProps) {
  const storyIsPreviewing = isStoryPreviewing(story);
  const button: Button = {
    collectionId: story.collection_id,
    is_disabled: storyIsPreviewing,
    label: storyIsPreviewing ? previewButtonLabel : buttonLabel,
    storyId: story.id,
  };
  // no-op because the card is clickable
  const handleButtonClick = () => true;
  return (
    <StoryCardContainer
      button={button}
      sx={sx}
    >
      {slot}

      <When condition={story.image}>
        <CardMedia
          alt={story.label}
          component="img"
          image={story.image!}
          sx={styles.image}
        />
      </When>

      <CardContent>
        <Typography
          component="div"
          gutterBottom
          sx={styles.label}
          variant="h5"
        >
          {story.label}
        </Typography>

        <Typography
          color="textSecondary"
          sx={styles.description}
          variant="body2"
        >
          {story.description}
        </Typography>
      </CardContent>

      <CardActions>
        <Unless condition={isHidingButton}>
          <StoriesAPIButton
            button={button}
            onClick={handleButtonClick}
            size="small"
            variant="text"
          />
        </Unless>
      </CardActions>
    </StoryCardContainer>
  );
}
