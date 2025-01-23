import Grid from '@mui/material/Grid2';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import type AVBaseMomentStore from '../../state/moments/avBaseMomentStore';
import MomentAVPlayPauseButton from '../MomentAVPlayPauseButton/MomentAVPlayPauseButton';
import StoryMomentTypography from '../StoryMoment/StoryMomentTypography';
import Icon from '../UI/Icon/Icon';
import styles from './MomentNavigatorListItem.styles';
import type { MomentNavigatorListItemProps } from './MomentNavigatorListItem.types';

const MomentNavigatorList = observer(({ moment }: MomentNavigatorListItemProps) => {
  const handleClick = () => moment.goTo();
  const color = moment.isPlaying ? 'primary.main' : undefined;

  return (
    <ListItemButton
      onClick={handleClick}
      selected={moment.isActive}
    >
      <ListItemIcon sx={styles.listIcon}>
        <Icon
          icon={moment.icon}
          sx={{ color }}
        />
      </ListItemIcon>

      <ListItemText
        primary={(
          <Grid
            color={color}
            container
          >
            <Grid size={moment.isPlaying ? 9 : 12}>
              <StoryMomentTypography
                disabled={moment.isInactive}
                field="label"
                moment={moment}
                variant="body2"
              />
            </Grid>

            <When condition={moment.isPlaying}>
              <Grid size={3}>
                <MomentAVPlayPauseButton
                  moment={moment as AVBaseMomentStore}
                  sx={styles.avButton}
                />
              </Grid>
            </When>

          </Grid>
        )}
      />
    </ListItemButton>
  );
});

export default MomentNavigatorList;
