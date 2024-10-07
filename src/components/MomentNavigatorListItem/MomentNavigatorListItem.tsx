import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import useMoments from '../../hooks/useMoments';
import Icon from '../UI/Icon/Icon';
import styles from './MomentNavigatorListItem.styles';
import type { MomentNavigatorListItemProps } from './MomentNavigatorListItem.types';

export default function MomentNavigatorListItem(props: MomentNavigatorListItemProps) {
  const { moment: { icon, index, label } } = props;
  const { activeMomentIndex, selectMoment } = useMoments();
  const handleSelectMoment = () => selectMoment(index);

  return (
    <ListItemButton
      onClick={handleSelectMoment}
      selected={activeMomentIndex === index}
    >
      <ListItemIcon sx={styles.listIcon}>
        <Icon icon={icon} />
      </ListItemIcon>

      <ListItemText primary={label} />
    </ListItemButton>
  );
}
