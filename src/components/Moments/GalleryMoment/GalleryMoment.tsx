import 'swiper/css';
import 'swiper/css/effect-cards';

import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';
import type { Swiper as SwiperClass } from 'swiper';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import StoryMomentTypography from '../../StoryMoment/StoryMomentTypography';
import PreviewableImage from '../../UI/PreviewableImage/PreviewableImage';
import BaseMoment from '../BaseMoment/BaseMoment';
import styles from './GalleryMoment.styles';
import type { GalleryMomentProps } from './GalleryMoment.types';

// TODO: Consider consolidating with CardsBaseMoment

const GalleryMoment = observer(({ moment }: GalleryMomentProps) => {
  const handleOnImageSwipe = (swiper: SwiperClass) => {
    if (!moment) {
      return;
    }
    moment.setActiveImageIndex(swiper.activeIndex);
  };

  return (
    <BaseMoment
      contentFit={moment.fit}
      contentSize={moment.size}
      moment={moment}
    >
      <Box sx={styles.container}>
        <Swiper
          className="gallery-swiper"
          effect="cards"
          grabCursor
          modules={[EffectCards]}
          onSlideChange={handleOnImageSwipe}
          style={styles.swiper(moment)}
        >
          {moment.data.images.map((image, index) => (
            <SwiperSlide
              key={image.url}
              className="gallery-slide"
            >
              <PreviewableImage
                alt={image.alt ?? image.caption ?? `Gallery image ${index + 1}`}
                src={image.url}
                sx={styles.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <When condition={moment.activeCaption}>
          <StoryMomentTypography
            computed
            field="activeCaption"
            moment={moment}
            richText
            sx={styles.caption}
            variant="body1"
          />
        </When>
      </Box>
    </BaseMoment>
  );
});

export default GalleryMoment;
