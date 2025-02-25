import IconButton from '@mui/material/IconButton';
import { Unless } from 'react-if';
import { Link } from 'react-router-dom';

import Tooltip from '../Tooltip/Tooltip';
import styles from './ActionButton.styles';
import type { ActionButtonProps } from './ActionButton.types';

const getColor = ({ color, isFailed, isSuccessful }: Pick<ActionButtonProps, 'color' | 'isFailed' | 'isSuccessful'>) => {
  if (isFailed) {
    return 'error';
  }
  if (isSuccessful) {
    return 'success';
  }
  return color;
};

export default function ActionButton({
  color,
  icon: Icon,
  isDisabled,
  isFailed,
  isHidden,
  isLoading,
  isSuccessful,
  onClick,
  title,
  to,
  ...iconButtonProps
}: ActionButtonProps) {
  const handleClick = (e: never) => {
    if (!isDisabled) {
      onClick?.(e);
    }
  };

  return (
    <Unless condition={isHidden}>
      <Tooltip title={title}>
        {/* @ts-expect-error dynamic typing of Link vs Button  */}
        <IconButton
          color={getColor({ color, isFailed, isSuccessful })}
          component={to ? Link : undefined}
          disabled={!isSuccessful && isDisabled}
          loading={isLoading}
          onClick={to ? undefined : handleClick}
          sx={styles.root}
          to={to}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...iconButtonProps}
        >
          <Icon sx={styles.icon} />
        </IconButton>
      </Tooltip>
    </Unless>
  );
}
