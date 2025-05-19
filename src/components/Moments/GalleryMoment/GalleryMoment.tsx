import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import GalleryMomentStore from '../../../state/moments/galleryMomentStore';
import type { Image } from '../../../types';
import StoryButton from '../../StoryButton/StoryButton';
import StoryMomentTypography from '../../StoryMoment/StoryMomentTypography';
import PreviewableImage from '../../UI/PreviewableImage/PreviewableImage';
import CardsBaseMoment from '../CardsBaseMoment/CardsBaseMoment';
import styles from './GalleryMoment.styles';
import type { GalleryMomentProps } from './GalleryMoment.types';

const toCaption = (
  { caption, caption_button }: Image,
  index: number,
  moment: GalleryMomentStore,
) => {
  if (!caption && !caption_button) {
    return undefined;
  }
  return (
    <>
      <When condition={!!caption}>
        <StoryMomentTypography
          color="grey.300"
          field={`data.images.${index}.caption`}
          moment={moment}
          richText
          variant="body1"
        />
      </When>

      <When condition={!!caption_button}>
        <Box>
          <StoryButton
            button={caption_button!}
            variant="outlined"
          />
        </Box>
      </When>
    </>
  );
};

const toImageKey = (index: number, image: Image) => `gallery-image-${index}-${image.url}`;

const GalleryMoment = observer(({ moment }: GalleryMomentProps) => (
  <CardsBaseMoment<GalleryMomentStore>
    gridColumnsMax={{
      xs: 1,
      sm: 1,
      md: 2,
      lg: 3,
    }}
    moment={moment}
    sx={styles.container(moment)}
  >
    {moment.items.map((image, index) => (
      <PreviewableImage
        key={toImageKey(index, image)}
        alt={image.alt ?? image.caption ?? `Gallery image ${index + 1}`}
        caption={toCaption(image, index, moment)}
        src={image.url}
        sx={styles.image(moment)}
      />
    ))}
  </CardsBaseMoment>
));

export default GalleryMoment;
