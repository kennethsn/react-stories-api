import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

import PreviewableImage from '../../UI/PreviewableImage/PreviewableImage';
import styles from './ImageMoment.styles';
import type { ImageMomentImageGridItemProps } from './ImageMoment.types';
// KSN TODO: lock swiper on preview

export default function ImageMomentImageGridItem({
  alt,
  boxSx,
  display,
  height,
  maxHeight,
  maxWidth,
  p,
  size,
  src,
}: ImageMomentImageGridItemProps) {
  return (
    <Grid
      display={display}
      height={height}
      maxHeight={maxHeight}
      p={p}
      size={size}
      sx={styles.imageContainer}
    >
      <Box
        maxWidth={maxWidth}
        sx={boxSx}
      >
        <PreviewableImage
          alt={alt}
          className="moment-image"
          src={src}
        />
      </Box>
    </Grid>
  );
}
