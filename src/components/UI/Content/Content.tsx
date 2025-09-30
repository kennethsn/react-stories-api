import Box from '@mui/material/Box';

import type { ContentProps } from './Content.types';
import ContentBlocks from './ContentBlocks';

export default function Content({ content, sx, sxBlockMap }: ContentProps) {
  return (
    <Box
      className={`content-block ${content.id}`}
      id={`content-block-${content.id}`}
      sx={sx}
    >
      <ContentBlocks
        content={content}
        sx={sx}
        sxBlockMap={sxBlockMap}
      />
    </Box>
  );
}
