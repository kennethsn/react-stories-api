import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import IconButton from '@mui/material/IconButton';
import type { MouseEventHandler } from 'react';
import {
  Else,
  If,
  Then,
} from 'react-if';

import { deepMerge } from '../../../utils/object';
import styles from './AVPlayPauseButton.styles';
import type { AVPlayPauseButtonProps } from './AVPlayPauseButton.types';

export default function AVPlayPauseButton({ isPlaying, onClick, sx }: AVPlayPauseButtonProps) {
  const buttonSx = sx ? deepMerge(styles.root, sx) : styles.root;
  const handlePlayPauseButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    onClick(!isPlaying);
  };
  return (
    <IconButton
      onClick={handlePlayPauseButtonClick}
      sx={buttonSx}
    >
      <If condition={isPlaying}>
        <Then>
          <PauseCircleOutlineIcon sx={styles.icon} />
        </Then>

        <Else>
          <PlayCircleOutlineIcon sx={styles.icon} />
        </Else>
      </If>
    </IconButton>
  );
}
