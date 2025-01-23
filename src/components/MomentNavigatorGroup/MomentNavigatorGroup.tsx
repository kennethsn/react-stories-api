import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';

import useMoments from '../../hooks/useMoments';
import MomentNavigatorListItem from '../MomentNavigatorListItem/MomentNavigatorListItem';
import ExpandIcon from '../UI/ExpandIcon/ExpandIcon';
import styles from './MomentNavigatorGroup.styles';
import type { MomentNavigatorGroupProps } from './MomentNavigatorGroup.types';

const MomentNavigatorGroup = observer(({ momentGroup }: MomentNavigatorGroupProps) => {
  const moments = useMoments();
  const groupId = momentGroup.id;
  const groupIsExpanded = moments.isGroupExpanded(groupId);

  const handleGroupButtonClick = () => {
    moments.toggleGroup(groupId);
  };

  return (
    <li key={`group-${groupId}`}>
      <ul>
        <ListSubheader
          onClick={handleGroupButtonClick}
          sx={styles.subheader}
        >
          <ExpandIcon expanded={groupIsExpanded} />

          <Typography
            color="primary"
            sx={styles.subheaderLabel}
            variant="overline"
          >
            {momentGroup.label}
          </Typography>
        </ListSubheader>

        <Collapse
          in={groupIsExpanded}
          timeout="auto"
          unmountOnExit
        >
          <List
            component="div"
            dense
            disablePadding
            sx={styles.groupContainer}
          >
            {momentGroup.moments.map((moment) => (
              <MomentNavigatorListItem
                key={moment.key}
                moment={moment}
              />
            ))}
          </List>
        </Collapse>
      </ul>
    </li>
  );
});

export default MomentNavigatorGroup;
