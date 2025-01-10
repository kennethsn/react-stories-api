import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { When } from 'react-if';

import StoryButton from '../StoryButton/StoryButton';
import styles from './MomentBodyLayout.styles';
import type { MomentBodyLayoutCaptionProps } from './MomentBodyLayout.types';

export default function MomentBodyLayoutCaption({
  boxShadow,
  button,
  content,
  m,
}: MomentBodyLayoutCaptionProps) {
  const hasContent = !!content;
  return (
    <Box
      boxShadow={boxShadow}
      m={m}
      sx={styles.captionContainer(hasContent)}
    >
      <When condition={hasContent}>
        <Typography
          sx={styles.caption}
          variant="body1"
        >
          {content}
        </Typography>
      </When>

      <When condition={!!button}>
        <StoryButton
          button={button!}
          sx={styles.captionButton(hasContent)}
          variant="outlined"
        />
      </When>
    </Box>
  );
}
