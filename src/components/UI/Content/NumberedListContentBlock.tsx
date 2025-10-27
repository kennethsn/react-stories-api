import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import parse from 'html-react-parser';

import { deepMergeMulti } from '../../../utils/object';
import styles from './Content.styles';
import type { NumberedListContentBlockProps } from './Content.types';

export default function NumberedListContentBlock(
  { contentBlock, sx }: NumberedListContentBlockProps,
) {
  const { items } = contentBlock;
  const mergedSx = deepMergeMulti(styles.textBlock, styles.numberedListBlock, sx);

  return (
    <Box component="ol" sx={mergedSx}>
      {items.map((item, index) => {
        const content = item.html ? parse(item.html) : item.text;
        if (!content) return null;

        return (
          <li key={item.text || item.html || `item-${index}`}>
            <Typography
              component="span"
              sx={item.sx}
              variant="body1"
            >
              {content}
            </Typography>
          </li>
        );
      })}
    </Box>
  );
}
