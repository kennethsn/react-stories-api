import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Unless } from 'react-if';

import styles from './MomentBodyLayout.styles';
import type { MomentBodyLayoutCaptionGridItemProps } from './MomentBodyLayout.types';

export default function MomentBodyLayoutCaptionGridItem({
  boxShadow,
  content,
  height,
  hide,
  size,
  m,
}: MomentBodyLayoutCaptionGridItemProps) {
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
