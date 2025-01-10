import Grid from '@mui/material/Grid2';
import { Unless } from 'react-if';

import styles from './MomentBodyLayout.styles';
import type { MomentBodyLayoutCaptionGridItemProps } from './MomentBodyLayout.types';
import MomentBodyLayoutCaption from './MomentBodyLayoutCaption';

export default function MomentBodyLayoutCaptionGridItem({
  boxShadow,
  button,
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
        <MomentBodyLayoutCaption
          boxShadow={boxShadow}
          button={button}
          content={content}
          m={m}
        />
      </Grid>
    </Unless>
  );
}
