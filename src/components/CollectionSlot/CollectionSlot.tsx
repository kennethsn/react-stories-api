import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import useCollectionSlot from '../../hooks/useCollectionSlot';
import type { CollectionSlotProps } from './CollectionSlot.types';

const CollectionSlot = observer(({ component, ...props }: CollectionSlotProps) => {
  const { Component, slotIsAvailable } = useCollectionSlot(component);
  return (
    <When condition={slotIsAvailable}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...props} />
    </When>
  );
});

export default CollectionSlot;
