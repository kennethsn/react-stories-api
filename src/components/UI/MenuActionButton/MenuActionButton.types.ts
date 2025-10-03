import type { MouseEvent, PropsWithChildren, SyntheticEvent } from 'react';

import type { ActionButtonProps } from '../ActionButton/ActionButton.types';

export type MenuActionButtonProps = PropsWithChildren & Omit<ActionButtonProps, 'onClick'> & {
  readonly id?: string;
  readonly onClose?: (e: SyntheticEvent) => void;
  readonly onOpen?: (e: MouseEvent<HTMLElement>) => void;
  readonly stopPropagation?: boolean;
};
