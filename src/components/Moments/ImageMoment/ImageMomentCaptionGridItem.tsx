import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Unless } from 'react-if';

import styles from './ImageMoment.styles';
import type { ImageMomentCaptionGridItemProps } from './ImageMoment.types';

export default function ImageMomentCaptionGridItem({
  boxShadow,
  content,
  height,
  hide,
  size,
  m,
}: ImageMomentCaptionGridItemProps) {
  return (
    <Unless condition={hide}>
      <Grid
        height={height}
        size={size}
        sx={styles.captionGridItem}
      >
        <Box
          boxShadow={boxShadow}
          m={m}
          sx={styles.captionContainer}
        >
          <Typography
            sx={styles.caption}
            variant="body1"
          >
            {content}
          </Typography>
        </Box>
      </Grid>
    </Unless>
  );
}
