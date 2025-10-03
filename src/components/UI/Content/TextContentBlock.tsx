import Typography from '@mui/material/Typography';

import { deepMerge } from '../../../utils/object';
import styles from './Content.styles';
import type { TextContentBlockProps } from './Content.types';

export default function TextContentBlock({ contentBlock, sx }: TextContentBlockProps) {
  const { text, variant } = contentBlock;
  return (
    <Typography
      sx={deepMerge(styles.textBlock, sx)}
      variant={variant || 'body1'}
    >
      {text}
    </Typography>
  );
}
