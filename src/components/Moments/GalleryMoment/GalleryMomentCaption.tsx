import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import StoryButton from '../../StoryButton/StoryButton';
import StoryMomentTypography from '../../StoryMoment/StoryMomentTypography';
import styles from './GalleryMoment.styles';
import type { GalleryMomentProps } from './GalleryMoment.types';

const GalleryMomentCaption = observer(({ moment }: GalleryMomentProps) => (
  <Box sx={styles.captionContainer}>

    <When condition={moment.activeCaption}>
      <StoryMomentTypography
        color="textSecondary"
        computed
        field="activeCaption"
        moment={moment}
        richText
        variant="body1"
      />
    </When>

    <When condition={!!moment.activeCaptionButton}>
      <Box>
        <StoryButton
          button={moment.activeCaptionButton!}
          variant="outlined"
        />
      </Box>
    </When>
  </Box>
));

export default GalleryMomentCaption;
