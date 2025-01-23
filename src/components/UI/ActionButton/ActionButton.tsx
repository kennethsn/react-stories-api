import IconButton from '@mui/material/IconButton';
import { Unless } from 'react-if';

import Tooltip from '../Tooltip/Tooltip';
import styles from './ActionButton.styles';
import type { ActionButtonProps } from './ActionButton.types';

export default function ActionButton({
  color,
  icon: Icon,
  isDisabled,
  isHidden,
  isLoading,
  isSuccessful,
  onClick,
  title,
}: ActionButtonProps) {
  const handleClick = () => {
    if (!isDisabled) {
      onClick();
    }
  };
  return (
    <Unless condition={isHidden}>
      <Tooltip title={title}>
        <IconButton
          color={isSuccessful ? 'success' : color}
          disabled={!isSuccessful && isDisabled}
          loading={isLoading}
          onClick={handleClick}
          sx={styles.root}
        >
          <Icon sx={styles.icon} />
        </IconButton>
      </Tooltip>
    </Unless>
  );
}
