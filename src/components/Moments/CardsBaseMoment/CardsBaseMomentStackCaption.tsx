import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import StoryButton from '../../StoryButton/StoryButton';
import StoryMomentTypography from '../../StoryMoment/StoryMomentTypography';
import styles from './CardsBaseMoment.styles';
import type { CardsBaseMomentStackCaptionProps } from './CardsBaseMoment.types';

const CardsBaseMomentStackCaption = observer(({ moment }: CardsBaseMomentStackCaptionProps) => (
  <Box sx={styles.stackLayoutCaptionContainer}>
    <When condition={!!moment?.activeCaption}>
      <StoryMomentTypography
        color="textSecondary"
        computed
        field="activeCaption"
        moment={moment}
        richText
        textFieldProps={{ sx: { width: '100%' } }}
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

export default CardsBaseMomentStackCaption;
