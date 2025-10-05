import type { PopoverProps } from '@mui/material/Popover';
import type { MouseEvent, PropsWithChildren, SyntheticEvent } from 'react';

import type { ActionButtonProps } from '../ActionButton/ActionButton.types';

export type MenuActionButtonProps = PropsWithChildren & Omit<ActionButtonProps, 'onClick'> & {
  readonly id?: string;
  readonly menuProps?: PopoverProps
  readonly onClose?: (e: SyntheticEvent) => void;
  readonly onOpen?: (e: MouseEvent<HTMLElement>) => void;
  readonly stopPropagation?: boolean;
};
