import Box from '@mui/material/Box';

import { deepMerge } from '../../../utils/object';
import { StoriesAPIButton } from '../../StoriesAPIButton';
import styles from './Content.styles';
import type { ButtonContentBlockProps } from './Content.types';

export default function ButtonContentBlock({ contentBlock, sx }: ButtonContentBlockProps) {
  const { background_sx: backgroundSx, button } = contentBlock;

  return (
    <Box sx={deepMerge(deepMerge(styles.buttonBlock, backgroundSx), sx)}>
      <StoriesAPIButton button={button} />
    </Box>
  );
}
