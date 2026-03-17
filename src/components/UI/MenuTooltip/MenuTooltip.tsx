import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import { observer } from 'mobx-react-lite';
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
  type SyntheticEvent,
  useId,
  useRef,
  useState,
} from 'react';

import useStoriesAPI from '../../../hooks/useStoriesAPI';
import { stopEventPropagation } from '../../../utils/dom';
import { deepMerge } from '../../../utils/object';
import styles from './MenuTooltip.styles';
import type { MenuTooltipProps } from './MenuTooltip.types';

const MenuTooltip = observer(({
  children,
  hover: isHoverMode,
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
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTriggerClick = (event: MouseEvent<HTMLElement>) => {
    if (shouldStopPropagation) {
      stopEventPropagation(event);
    }
    onOpen?.(event);
    setAnchorEl(event.currentTarget);
    menus.open(id);
  };

  const handleTriggerMouseEnter = (event: MouseEvent<HTMLElement>) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    if (shouldStopPropagation) {
      stopEventPropagation(event);
    }
    onOpen?.(event);
    setAnchorEl(event.currentTarget);
    menus.open(id);
  };

  const handleTriggerMouseLeave = (event: SyntheticEvent) => {
    closeTimeoutRef.current = setTimeout(() => {
      if (shouldStopPropagation) {
        stopEventPropagation(event);
      }
      menus.close();
      onClose?.(event);
      setAnchorEl(null);
    }, 200);
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

  const handlePopoverMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
  };

  const handlePopoverMouseLeave = (event: SyntheticEvent) => {
    if (isHoverMode) {
      closeTimeoutRef.current = setTimeout(() => {
        if (shouldStopPropagation) {
          stopEventPropagation(event);
        }
        menus.close();
        onClose?.(event);
        setAnchorEl(null);
      }, 200);
    }
  };

  const triggerProps = isHoverMode
    ? {
      onMouseEnter: handleTriggerMouseEnter,
      onMouseLeave: handleTriggerMouseLeave,
    }
    : {
      onClick: handleTriggerClick,
      onKeyDown: handleTriggerKeyDown,
    };

  return (
    <>
      <Box
        component="span"
        role="button"
        sx={styles.trigger}
        tabIndex={isHoverMode ? -1 : 0}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...triggerProps}
      >
        {trigger}
      </Box>

      <Popover
        anchorEl={anchorEl}
        id={id}
        onClick={handleMenuClick}
        onClose={handleMenuClose}
        onMouseDown={handleMenuClick}
        onMouseEnter={isHoverMode ? handlePopoverMouseEnter : undefined}
        onMouseLeave={isHoverMode ? handlePopoverMouseLeave : undefined}
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
