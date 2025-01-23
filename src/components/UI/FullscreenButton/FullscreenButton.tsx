import Fullscreen from '@mui/icons-material/Fullscreen';
import FullscreenExit from '@mui/icons-material/FullscreenExit';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { Else, If, Then } from 'react-if';

import useOnLoad from '../../../hooks/useOnLoad';
import { toggleFullscreen } from '../../../utils/fullscreen';
import type { FullscreenButtonProps } from './FullscreenButton.types';

export default function FullscreenButton({ className, elementSelector }: FullscreenButtonProps) {
  const [fullscreenIsEnabled, setFullscreenIsEnabled] = useState<boolean>(false);
  useOnLoad(() => {
    document.onfullscreenchange = () => {
      setFullscreenIsEnabled(Boolean(document.fullscreenElement));
    };
  });
  const handleClick = () => toggleFullscreen(elementSelector);
  return (
    <IconButton
      className={className}
      color="inherit"
      onClick={handleClick}
    >
      <If condition={fullscreenIsEnabled}>
        <Then>
          <Fullscreen />
        </Then>

        <Else>
          <FullscreenExit />
        </Else>
      </If>
    </IconButton>
  );
}
