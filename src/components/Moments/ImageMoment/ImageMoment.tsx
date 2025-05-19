import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import StoryButton from '../../StoryButton/StoryButton';
import StoryMomentTypography from '../../StoryMoment/StoryMomentTypography';
import PreviewableImage from '../../UI/PreviewableImage/PreviewableImage';
import BaseMoment from '../BaseMoment/BaseMoment';
import styles from './ImageMoment.styles';
import type { ImageMomentProps } from './ImageMoment.types';
// KSN TODO: lock swiper on preview

const ImageMoment = observer(({ moment }: ImageMomentProps) => (
  <BaseMoment
    contentFit={moment.fit}
    contentSize={moment.size}
    moment={moment}
    noContentElevation
  >
    <PreviewableImage
      alt={moment.alt}
      caption={moment.hasCaption ? (
        <>
          <When condition={moment.hasCaptionContent}>
            <StoryMomentTypography
              color="grey.300"
              field="data.caption.content"
              moment={moment}
              richText
              variant="body1"
            />
          </When>

          <When condition={moment.hasCaptionButton}>
            <Box>
              <StoryButton
                button={moment.captionButton!}
                variant="outlined"
              />
            </Box>
          </When>
        </>
      ) : undefined}
      className="moment-image"
      src={moment.url}
      sx={styles.image(moment)}
    />
  </BaseMoment>
));

export default ImageMoment;
