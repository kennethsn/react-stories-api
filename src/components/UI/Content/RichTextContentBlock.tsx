import Typography from '@mui/material/Typography';
import parse from 'html-react-parser';

import { deepMergeMulti } from '../../../utils/object';
import styles from './Content.styles';
import type { RichTextContentBlockProps } from './Content.types';

export default function RichTextContentBlock({ contentBlock, sx }: RichTextContentBlockProps) {
  const { html } = contentBlock;
  const mergedSx = deepMergeMulti(styles.textBlock, styles.richTextBlock, sx);
  return (
    <Typography
      sx={mergedSx}
      variant="body1"
    >
      {parse(html)}
    </Typography>
  );
}
