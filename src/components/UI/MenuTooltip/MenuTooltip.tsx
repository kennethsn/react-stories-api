import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import { observer } from 'mobx-react-lite';
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
  type SyntheticEvent,
  useId,
  useState,
} from 'react';

import useStoriesAPI from '../../../hooks/useStoriesAPI';
import { stopEventPropagation } from '../../../utils/dom';
import { deepMerge } from '../../../utils/object';
import styles from './MenuTooltip.styles';
import type { MenuTooltipProps } from './MenuTooltip.types';

const MenuTooltip = observer(({
  children,
  id: customId,
  menuProps,
  onOpen,
  onClose,
  stopPropagation: shouldStopPropagation,
  trigger,
}: MenuTooltipProps) => {
  const { menus } = useStoriesAPI();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { sx: menuSx, ...restMenuProps } = menuProps ?? {};
  const generatedId = useId();
  const id = customId ?? `menu-tooltip-${generatedId}`;

  const handleTriggerClick = (event: MouseEvent<HTMLElement>) => {
    if (shouldStopPropagation) {
      stopEventPropagation(event);
    }
    onOpen?.(event);
    setAnchorEl(event.currentTarget);
    menus.open(id);
  };

  const handleMenuClose = (event: SyntheticEvent) => {
    if (shouldStopPropagation) {
      stopEventPropagation(event);
    }
    menus.close();
    onClose?.(event);
    setAnchorEl(null);
  };

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    // Prevent ripple animation on container elements
    stopEventPropagation(event);
  };

  const handleTriggerKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    event.preventDefault();
    handleTriggerClick(event as unknown as MouseEvent<HTMLElement>);
  };

  return (
    <>
      <Box
        component="span"
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
        role="button"
        sx={styles.trigger}
        tabIndex={0}
      >
        {trigger}
      </Box>

      <Popover
        anchorEl={anchorEl}
        id={id}
        onClick={handleMenuClick}
        onClose={handleMenuClose}
        onMouseDown={handleMenuClick}
        open={menus.menuIsOpen(id)}
        sx={deepMerge(styles.popover, menuSx)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restMenuProps}
      >
        {children}
      </Popover>
    </>
  );
});

export default MenuTooltip;
