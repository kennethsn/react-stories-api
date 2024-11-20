import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Unless, When } from 'react-if';

import useStoriesAPINavigation from '../../hooks/useStoriesAPINavigation';
import { deepMerge } from '../../utils';
import { StoriesAPIButton } from '../StoriesAPIButton';
import styles from './StoryCard.styles';
import type { StoryCardProps } from './StoryCard.types';

export default function StoryCard({
  buttonLabel = 'View Story',
  isHidingButton = false,
  story,
  sx,
}: StoryCardProps) {
  const { goTo } = useStoriesAPINavigation();
  const button = {
    collectionId: story.collection_id,
    label: buttonLabel,
    storyId: story.id,
  };
  const handleClick = () => goTo(button);
  return (
    <Card
      className="story-card"
      sx={deepMerge(styles.root, sx)}
    >
      <CardActionArea onClick={handleClick}>
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
      </CardActionArea>

      <CardActions>
        <Unless condition={isHidingButton}>
          <StoriesAPIButton
            button={button}
            size="small"
          />
        </Unless>
      </CardActions>
    </Card>
  );
}
