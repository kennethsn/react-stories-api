import InfoOutlined from '@mui/icons-material/InfoOutlined';
import RotateRight from '@mui/icons-material/RotateRight';
import ZoomIn from '@mui/icons-material/ZoomIn';
import ZoomOut from '@mui/icons-material/ZoomOut';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { When } from 'react-if';

import FullscreenButton from '../FullscreenButton/FullscreenButton';
import styles from './PreviewableImage.styles';
import type { PreviewableImageToolbarProps } from './PreviewableImage.types';

const PreviewableImageToolbar = observer(({
  caption,
  onRotate,
  onScale,
  rotate,
  scale,
}: PreviewableImageToolbarProps) => {
  const [captionOpen, setCaptionOpen] = useState(true);

  const handleInfoClick = () => setCaptionOpen((prev) => !prev);
  const handleRotateRightClick = () => onRotate(rotate + 90);
  const handleZoomInClick = () => onScale(scale + 0.5);
  const handleZoomOutClick = () => onScale(scale - 0.5);
  return (
    <>
      <When condition={!!caption}>
        <IconButton
          className="PhotoView-Slider__toolbarIcon"
          color={captionOpen ? 'info' : 'inherit'}
          onClick={handleInfoClick}
        >
          <InfoOutlined />
        </IconButton>
      </When>

      <IconButton
        className="PhotoView-Slider__toolbarIcon"
        color="inherit"
        onClick={handleZoomInClick}
      >
        <ZoomIn />
      </IconButton>

      <IconButton
        className="PhotoView-Slider__toolbarIcon"
        color="inherit"
        onClick={handleZoomOutClick}
      >
        <ZoomOut />
      </IconButton>

      <IconButton
        className="PhotoView-Slider__toolbarIcon"
        color="inherit"
        onClick={handleRotateRightClick}
      >
        <RotateRight />
      </IconButton>

      <FullscreenButton
        className="PhotoView-Slider__toolbarIcon"
        elementSelector=".PhotoView-Portal"
      />

      <When condition={!!caption && captionOpen}>
        <Box sx={styles.captionContainer}>
          {caption}
        </Box>
      </When>
    </>
  );
});

export default PreviewableImageToolbar;
