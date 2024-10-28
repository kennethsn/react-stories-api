import Grid from '@mui/material/Grid2';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { When } from 'react-if';

import useAV from '../../hooks/useAV';
import useMoments from '../../hooks/useMoments';
import useStory from '../../hooks/useStory';
import MomentAVPlayPauseButton from '../MomentAVPlayPauseButton/MomentAVPlayPauseButton';
import Icon from '../UI/Icon/Icon';
import styles from './MomentNavigatorListItem.styles';
import type { MomentNavigatorListItemProps } from './MomentNavigatorListItem.types';

export default function MomentNavigatorListItem({ moment }: MomentNavigatorListItemProps) {
  const { icon, index: momentIndex, label } = moment;
  const { storyId } = useStory();
  const { momentIsActive, selectMoment } = useMoments(momentIndex);
  const { av, isPlaying } = useAV({ momentIndex, storyId });

  const handleClick = () => selectMoment(momentIndex);
  const color = isPlaying ? 'primary.main' : undefined;

  return (
    <ListItemButton
      onClick={handleClick}
      selected={momentIsActive}
    >
      <ListItemIcon sx={styles.listIcon}>
        <Icon
          icon={icon}
          sx={{ color }}
        />
      </ListItemIcon>

      <ListItemText
        primary={(
          <Grid
            color={color}
            container
          >
            <Grid size={isPlaying ? 9 : 12}>
              {label}
            </Grid>

            <When condition={isPlaying}>
              <Grid size={3}>
                <MomentAVPlayPauseButton
                  av={av!}
                  sx={styles.avButton}
                />
              </Grid>
            </When>

          </Grid>
        )}
      />
    </ListItemButton>
  );
}
