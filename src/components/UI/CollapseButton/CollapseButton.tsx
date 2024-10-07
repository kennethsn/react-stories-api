import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import {
  Else,
  If,
  Then,
} from 'react-if';

import { deepMerge } from '../../../utils/object';
import styles from './CollapseButton.styles';
import type { CollapseButtonProps } from './CollapseButton.types';

export default function CollapseButton({
  collapsed,
  onClick,
  showOnHover,
  sx,
}: CollapseButtonProps) {
  const buttonSx = sx ? deepMerge(styles.root, sx) : styles.root;
  let collapseButtonClassName = collapsed ? 'collapsed' : 'expanded';
  if (showOnHover) {
    collapseButtonClassName += ' show-on-hover';
  }
  const handleCollapseButtonClick = () => onClick(!collapsed);
  return (
    <IconButton
      className={collapseButtonClassName}
      onClick={handleCollapseButtonClick}
      size="small"
      sx={buttonSx}
    >
      <If condition={collapsed}>
        <Then>
          <KeyboardArrowDown />
        </Then>

        <Else>
          <KeyboardArrowUp />
        </Else>
      </If>
    </IconButton>
  );
}
