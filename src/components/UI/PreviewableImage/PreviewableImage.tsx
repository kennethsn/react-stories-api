import RotateRight from '@mui/icons-material/RotateRight';
import ZoomIn from '@mui/icons-material/ZoomIn';
import ZoomOut from '@mui/icons-material/ZoomOut';
import IconButton from '@mui/material/IconButton';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import type { OverlayRenderProps } from 'react-photo-view/dist/types';

import FullscreenButton from '../FullscreenButton/FullscreenButton';
import type { PreviewableImageProps } from './PreviewableImage.types';

// KSN TODO: lock swiper controls when preview is opened
export default function PreviewableImage({ alt, className, src }: PreviewableImageProps) {
  return (
    <PhotoProvider toolbarRender={renderImageToolbar}>
      <PhotoView src={src}>
        <img
          alt={alt}
          className={className}
          src={src}
        />
      </PhotoView>
    </PhotoProvider>
  );
}

function renderImageToolbar({
  onRotate,
  onScale,
  rotate,
  scale,
}: OverlayRenderProps) {
  const handleRotateRightClick = () => onRotate(rotate + 90);
  const handleZoomInClick = () => onScale(scale + 0.5);
  const handleZoomOutClick = () => onScale(scale - 0.5);
  return (
    <>
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
    </>
  );
}
