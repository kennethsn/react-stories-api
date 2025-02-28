import Fullscreen from '@mui/icons-material/Fullscreen';
import FullscreenExit from '@mui/icons-material/FullscreenExit';
import { useState } from 'react';

import useOnLoad from '../../../hooks/useOnLoad';
import { toggleFullscreen } from '../../../utils/fullscreen';
import ConditionalIconButton from '../ConditionalIconButton/ConditionalIconButton';
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
    <ConditionalIconButton
      className={className}
      color="inherit"
      condition={fullscreenIsEnabled}
      falseIcon={<FullscreenExit />}
      onClick={handleClick}
      trueIcon={<Fullscreen />}
    />
  );
}
