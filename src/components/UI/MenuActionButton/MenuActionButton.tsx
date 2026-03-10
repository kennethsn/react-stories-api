import { observer } from 'mobx-react-lite';

import ActionButton from '../ActionButton/ActionButton';
import MenuTooltip from '../MenuTooltip/MenuTooltip';
import type { MenuActionButtonProps } from './MenuActionButton.types';

const MenuActionButton = observer(({
  children,
  hover,
  menuProps,
  onClose,
  onOpen,
  stopPropagation,
  title,
  ...props
}: MenuActionButtonProps) => {
  const id = props.id ?? `${title}Menu`;

  return (
    <MenuTooltip
      hover={hover}
      id={id}
      menuProps={menuProps}
      onClose={onClose}
      onOpen={onOpen}
      stopPropagation={stopPropagation}
      trigger={(
        <ActionButton
          title={title}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        />
      )}
    >
      {children}
    </MenuTooltip>
  );
});

export default MenuActionButton;
