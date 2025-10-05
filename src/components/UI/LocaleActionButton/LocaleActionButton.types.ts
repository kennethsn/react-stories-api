import type { MenuActionButtonProps } from '../MenuActionButton/MenuActionButton.types';

export type LocaleActionButtonProps = Partial<MenuActionButtonProps> & {
  id: string;
};
