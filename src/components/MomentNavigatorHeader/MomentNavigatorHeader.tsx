import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { When } from 'react-if';

import useAV from '../../hooks/useAV';
import useStory from '../../hooks/useStory';
import MomentAVPlayPauseButton from '../MomentAVPlayPauseButton/MomentAVPlayPauseButton';
import styles from './MomentNavigatorHeader.styles';

export default function MomentNavigatorHeader() {
  const { branding, story: { description, id: storyId, label } } = useStory();
  const { av, isPlaying } = useAV({ storyId });

  const hasBranding = !!branding;
  return (
    <Grid
      size={12}
      sx={{
        ...styles.labelContainer,
        pt: hasBranding ? 0 : 2,
      }}
    >
      <Typography
        color="primary"
        variant="h6"
      >
        {label}
      </Typography>

      <When condition={!!description}>
        <Divider sx={styles.divider} />

        <When condition={isPlaying}>
          <MomentAVPlayPauseButton
            av={av!}
            sx={styles.avButton}
          />
        </When>

        <Typography
          color="textSecondary"
          component="div"
          sx={styles.description}
          variant="caption"
        >
          {description}
        </Typography>
      </When>
    </Grid>
  );
}
