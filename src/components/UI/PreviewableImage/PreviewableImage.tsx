import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import type { OverlayRenderProps } from 'react-photo-view/dist/types';

import type { PreviewableImageProps } from './PreviewableImage.types';
import PreviewableImageToolbar from './PreviewableImageToolbar';

// KSN TODO: lock swiper controls when preview is opened
// KSN TODO: when clicking on caption button, ensure closes the preview
const PreviewableImage = observer(({
  alt,
  caption,
  className,
  onClick,
  src,
  sx,
}: PreviewableImageProps) => (
  <PhotoProvider
    toolbarRender={(props: OverlayRenderProps) => (
      <PreviewableImageToolbar
        caption={caption}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    )}
  >
    <PhotoView src={src}>
      <Box
        alt={alt}
        className={className}
        component="img"
        onClick={onClick}
        src={src}
        sx={sx}
      />
    </PhotoView>
  </PhotoProvider>
));

export default PreviewableImage;
