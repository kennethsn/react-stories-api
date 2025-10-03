import Popover from '@mui/material/Popover';
import { observer } from 'mobx-react-lite';
import { type MouseEvent, type SyntheticEvent, useState } from 'react';

import useStoriesAPI from '../../../hooks/useStoriesAPI';
import { stopEventPropagation } from '../../../utils/dom';
import ActionButton from '../ActionButton/ActionButton';
import styles from './MenuActionButton.styles';
import type { MenuActionButtonProps } from './MenuActionButton.types';

const MenuActionButton = observer(({
  children,
  onClose,
  onOpen,
  stopPropagation,
  title,
  ...props
}: MenuActionButtonProps) => {
  const { menus } = useStoriesAPI();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const id = props.id ?? `${title}Menu`;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (stopPropagation) {
      stopEventPropagation(event);
    }
    onOpen?.(event);
    setAnchorEl(event.currentTarget);
    menus.open(id);
  };

  const handleClose = (event: SyntheticEvent) => {
    if (stopPropagation) {
      stopEventPropagation(event);
    }
    menus.close();
    onClose?.(event);
    setAnchorEl(null);
  };

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    // This prevents the ripple animation from appearing on container elements such as the
    // Story moment navigator list item's actions.
    stopEventPropagation(event);
  };

  return (
    <>
      <ActionButton
        title={title}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        onClick={handleClick}
      />

      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        id={id}
        onClick={handleMenuClick}
        onClose={handleClose}
        onMouseDown={handleMenuClick}
        open={menus.menuIsOpen(id)}
        sx={styles.popover}
      >
        {children}
      </Popover>
    </>
  );
});

export default MenuActionButton;
