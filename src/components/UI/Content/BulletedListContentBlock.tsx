import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import parse from 'html-react-parser';

import { deepMergeMulti } from '../../../utils/object';
import styles from './Content.styles';
import type { BulletedListContentBlockProps } from './Content.types';

const itemKey = (index: number) => `bulleted-list-item-${index}`;

export default function BulletedListContentBlock(
  { contentBlock, sx }: BulletedListContentBlockProps,
) {
  const { items } = contentBlock;
  const mergedSx = deepMergeMulti(styles.textBlock, styles.bulletedListBlock, sx);

  return (
    <Box component="ul" sx={mergedSx}>
      {items.map((item, index) => {
        const content = item.html ? parse(item.html) : item.text;
        if (!content) return null;

        return (
          <li key={itemKey(index)}>
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
