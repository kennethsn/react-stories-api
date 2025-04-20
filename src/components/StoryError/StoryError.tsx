import AutoFixHighTwoToneIcon from '@mui/icons-material/AutoFixHighTwoTone';
import CellTowerTwoToneIcon from '@mui/icons-material/CellTowerTwoTone';
import GppMaybeTwoToneIcon from '@mui/icons-material/GppMaybeTwoTone';
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';

import { useStories } from '../../hooks';
import { StoriesAPIButton } from '../StoriesAPIButton';
import StatusPage from '../UI/StatusPage/StatusPage';
import styles from './StoryError.styles';
import type { StoryErrorProps } from './StoryError.types';

const errorConfigs = {
  401: {
    icon: GppMaybeTwoToneIcon,
    message: 'You must be logged in to view this story.',
    title: 'Unauthorized',
  },
  404: {
    icon: TravelExploreIcon,
    message: 'Hmmm... the story you are looking for does not exist.',
    title: 'Not Found',
  },
  410: {
    icon: Inventory2TwoToneIcon,
    message: 'This story has been archived.',
    title: 'Archived',
  },
  423: {
    icon: AutoFixHighTwoToneIcon,
    message: 'This story is currently being curated. Check back soon!',
    title: 'Coming Soon',
  },
  500: {
    icon: CellTowerTwoToneIcon,
    message: 'There was an issue loading the story. Please try again later.',
    title: 'Oops...',
  },
};

const StoryError = observer(({ collectionId, isFullscreen, storyId }: StoryErrorProps) => {
  const stories = useStories();
  const errorCode = stories.getStoryFetchErrorCode(storyId);
  if (!errorCode) {
    return null;
  }
  const { icon, message, title } = errorConfigs[errorCode as keyof typeof errorConfigs];
  return (
    <StatusPage
      iconComponent={icon}
      isFullscreen={isFullscreen}
    >
      <Grid>
        <Typography
          color="textSecondary"
          sx={styles.title}
          variant="h3"
        >
          {title}
        </Typography>
      </Grid>

      <Divider />

      <Grid>
        <Typography
          color="textSecondary"
          variant="subtitle1"
        >
          {message}
        </Typography>
      </Grid>

      <Grid>
        <StoriesAPIButton
          button={{
            collection_id: collectionId,
            label: 'Go to Collection',
          }}
          color="primary"
          sx={styles.button}
        />
      </Grid>
    </StatusPage>
  );
});

export default StoryError;
