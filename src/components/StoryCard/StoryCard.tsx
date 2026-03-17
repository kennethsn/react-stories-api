import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Unless, When } from 'react-if';

import type { Button } from '../../types';
import { deepMerge } from '../../utils/object';
import { isStoryPreviewing, isStoryUnpublished } from '../../utils/storyUtils';
import { StoriesAPIButton } from '../StoriesAPIButton';
import StoryId from '../UI/StoryId/StoryId';
import TypographyBadge from '../UI/TypographyBadge/TypographyBadge';
import styles from './StoryCard.styles';
import type { StoryCardProps } from './StoryCard.types';
import StoryCardContainer from './StoryCardContainer';

export default function StoryCard({
  badgeSx,
  buttonLabel = 'View Story', // KSN TODO: connect this to formatters
  isDisabled,
  isHidingButton = false,
  newTab,
  previewButtonLabel = 'Coming Soon', // KSN TODO: connect this to formatters
  showStoryId = false,
  slot,
  story,
  storyIdActions,
  sx,
}: StoryCardProps) {
  const storyIsPreviewing = isStoryPreviewing(story);
  const button: Button = {
    collection_id: story.collection_id,
    is_disabled: typeof isDisabled === 'boolean' ? isDisabled : isStoryUnpublished(story),
    label: storyIsPreviewing ? previewButtonLabel : buttonLabel,
    new_tab: newTab,
    story_id: story.id,
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
          <span className="StoryCardLabelText">
            {story.label}
          </span>

          <TypographyBadge sx={deepMerge(styles.badge, badgeSx)}>
            {story.badge}
          </TypographyBadge>
        </Typography>

        <Typography
          color="textSecondary"
          sx={styles.description}
          variant="body2"
        >
          {story.description}
        </Typography>

        <When condition={showStoryId}>
          <StoryId
            actions={storyIdActions}
            color="textSecondary"
            story={story}
            sx={styles.storyId}
            variant="caption"
          />
        </When>
      </CardContent>

      <CardActions>
        <Unless condition={isHidingButton}>
          <StoriesAPIButton
            button={button}
            component="div"
            onClick={handleButtonClick}
            size="small"
            variant="text"
          />
        </Unless>
      </CardActions>
    </StoryCardContainer>
  );
}
