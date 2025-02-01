import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { observer } from 'mobx-react-lite';

import useMoments from '../../hooks/useMoments';
import { cleanInputValue } from '../../utils';
import MomentNavigatorListItem from '../MomentNavigatorListItem/MomentNavigatorListItem';
import EditableTypography from '../UI/EditableTypography/EditableTypography';
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

  const handleTypograpahyBlur = (value: string) => {
    const cleanedValue = cleanInputValue(value, momentGroup.label);
    if (cleanedValue) {
      moments.updateMomentGroup(groupId, cleanedValue);
    }
  };

  return (
    <li key={`group-${groupId}`}>
      <ul>
        <ListSubheader
          onClick={handleGroupButtonClick}
          sx={styles.subheader}
        >
          <ExpandIcon expanded={groupIsExpanded} />

          <EditableTypography
            color="primary"
            disabled={!moments.areEditable}
            onBlur={handleTypograpahyBlur}
            sx={styles.subheaderLabel}
            value={momentGroup.label}
            variant="overline"
          />
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
