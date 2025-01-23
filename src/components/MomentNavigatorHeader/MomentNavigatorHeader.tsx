import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import useStory from '../../hooks/useStory';
import StoryActions from '../StoryActions/StoryActions';
import StoryTypography from '../StoryTypography/StoryTypography';
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
        variant="h6"
      />

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

      <When condition={story.shouldShowActions}>
        <StoryActions />
      </When>
    </Grid>
  );
});

export default MomentNavigatorHeader;
