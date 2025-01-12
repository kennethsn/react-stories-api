import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';

import useStoriesAPINavigation from '../../hooks/useStoriesAPINavigation';
import { deepMerge } from '../../utils';
import styles from './StoryCard.styles';
import type { StoryCardContainerProps } from './StoryCard.types';

export default function StoryCardContainer({
  button,
  children,
  sx,
}: StoryCardContainerProps) {
  const { goTo } = useStoriesAPINavigation();
  const handleClick = () => goTo(button);
  return (
    <Card
      className="story-card"
      sx={deepMerge(styles.root, sx)}
    >
      <CardActionArea
        disabled={button.is_disabled}
        onClick={handleClick}
      >
        {children}
      </CardActionArea>
    </Card>
  );
}
