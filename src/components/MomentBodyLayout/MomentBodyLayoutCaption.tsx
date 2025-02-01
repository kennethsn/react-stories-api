import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import useMoment from '../../hooks/useMoment';
import StoryButton from '../StoryButton/StoryButton';
import StoryMomentTypography from '../StoryMoment/StoryMomentTypography';
import styles from './MomentBodyLayout.styles';
import type { MomentBodyLayoutCaptionProps } from './MomentBodyLayout.types';

const MomentBodyLayoutCaption = observer(({ boxShadow, m }: MomentBodyLayoutCaptionProps) => {
  const moment = useMoment();
  return (
    <Box
      boxShadow={boxShadow}
      m={m}
      sx={styles.captionContainer(moment.hasCaptionContent)}
    >
      <When condition={moment.hasCaptionContent}>
        <StoryMomentTypography
          field="data.caption.content"
          moment={moment}
          sx={styles.caption}
          variant="body1"
        />
      </When>

      <When condition={moment.hasCaptionButton}>
        <StoryButton
          button={moment.captionButton!}
          sx={styles.captionButton(moment.hasCaptionContent)}
          variant="outlined"
        />
      </When>
    </Box>
  );
});

export default MomentBodyLayoutCaption;
