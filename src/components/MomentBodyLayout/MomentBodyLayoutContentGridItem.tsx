import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

import styles from './MomentBodyLayout.styles';
import type { MomentBodyLayoutContentGridItemProps } from './MomentBodyLayout.types';

export default function MomentBodyLayoutContentGridItem({
  borderRadius,
  boxShadow,
  children,
  display,
  height,
  maxHeight,
  maxWidth,
  p,
  size,
}: MomentBodyLayoutContentGridItemProps) {
  return (
    <Grid
      display={display}
      height={height}
      maxHeight={maxHeight}
      p={p}
      size={size}
      sx={styles.contentContainer}
    >
      <Box
        maxWidth={maxWidth}
        sx={styles.content(borderRadius, boxShadow)}
      >
        {children}
      </Box>
    </Grid>
  );
}
