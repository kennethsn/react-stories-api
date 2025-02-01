import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import useStorySlot from '../../hooks/useStorySlot';
import type { StorySlotProps } from './StorySlot.types';

const StorySlot = observer(({ component, ...props }: StorySlotProps) => {
  const { Component, slotIsAvailable } = useStorySlot(component);
  return (
    <When condition={slotIsAvailable}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...props} />
    </When>
  );
});

export default StorySlot;
