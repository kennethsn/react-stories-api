import IconButton from '@mui/material/IconButton';
import { Else, If, Then } from 'react-if';

import type { ConditionalIconButtonProps } from './ConditionalIconButton.types';

export default function ConditionalIconButton({
  condition,
  falseIcon,
  trueIcon,
  ...iconButtonProps
}: ConditionalIconButtonProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <IconButton {...iconButtonProps}>
      <If condition={condition}>
        <Then>
          {trueIcon}
        </Then>

        <Else>
          {falseIcon}
        </Else>
      </If>
    </IconButton>
  );
}
