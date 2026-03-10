import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import useStory from '../../hooks/useStory';
import StoryActions from '../StoryActions/StoryActions';
import StoryTypography from '../StoryTypography/StoryTypography';
import StoryId from '../UI/StoryId/StoryId';
import TypographyBadge from '../UI/TypographyBadge/TypographyBadge';
import styles from './MomentNavigatorHeader.styles';

const MomentNavigatorHeader = observer(() => {
  const story = useStory();
  return (
    <Grid
      size={12}
      sx={styles.labelContainer(story.hasBranding)}
    >
      <StoryTypography
        color="primary"
        field="label"
        required
        sx={styles.label}
        variant="h6"
      />

      <When condition={story.hasBadge}>
        <TypographyBadge
          color="secondary"
          sx={styles.badge}
        >
          <StoryTypography
            field="badge"
            sx={styles.badgeText}
          />
        </TypographyBadge>
      </When>

      <When condition={story.hasDescription}>
        <Divider sx={styles.divider} />

        <StoryTypography
          color="textSecondary"
          component="div"
          field="description"
          sx={styles.description}
          variant="caption"
        />
      </When>

      <Box sx={styles.actionsContainer}>
        <When condition={story.shouldShowActions}>
          <StoryActions />
        </When>

        <When condition={story.shouldShowStoryId}>
          <StoryId
            actions={story.storyIdActions}
            color="textSecondary"
            story={story.story}
            sx={styles.storyId}
            variant="caption"
          />
        </When>
      </Box>
    </Grid>
  );
});

export default MomentNavigatorHeader;
