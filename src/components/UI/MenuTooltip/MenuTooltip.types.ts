import type { PopoverProps } from '@mui/material/Popover';
import type {
  MouseEvent, PropsWithChildren, ReactNode, SyntheticEvent,
} from 'react';

export type MenuTooltipProps = PropsWithChildren & {
  readonly hover?: boolean;
  readonly id?: string;
  readonly menuProps?: Omit<PopoverProps, 'anchorEl' | 'id' | 'onClose' | 'open' | 'children'>;
  readonly onClose?: (e: SyntheticEvent) => void;
  readonly onOpen?: (e: MouseEvent<HTMLElement>) => void;
  readonly stopPropagation?: boolean;
  readonly trigger: ReactNode;
};
