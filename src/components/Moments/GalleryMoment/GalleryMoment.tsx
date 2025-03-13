import 'swiper/css';
import 'swiper/css/effect-cards';

import { observer } from 'mobx-react-lite';
import type { Swiper as SwiperClass } from 'swiper';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import PreviewableImage from '../../UI/PreviewableImage/PreviewableImage';
import BaseMoment from '../BaseMoment/BaseMoment';
import type { GalleryMomentProps } from './GalleryMoment.types';

// TODO: Consider consolidating with CardsBaseMoment

const GalleryMoment = observer(({ moment }: GalleryMomentProps) => {
  const { activeCaption } = moment;

  const handleOnImageSwipe = (swiper: SwiperClass) => {
    if (!moment) {
      return;
    }
    moment.setActiveImageIndex(swiper.activeIndex);
  };

  return (
    <BaseMoment moment={moment}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Swiper
          className="gallery-swiper"
          effect="cards"
          grabCursor
          modules={[EffectCards]}
          onSlideChange={handleOnImageSwipe}
          style={{ width: '320px', height: '480px' }}
        >
          {moment.data.images.map((image, index) => (
            <SwiperSlide key={image.url} className="gallery-slide">
              <PreviewableImage
                alt={image.caption || `Gallery image ${index + 1}`}
                src={image.url}
                sx={{
                  width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '16px', color: '#333', fontWeight: '500' }}>
            {activeCaption}
          </p>
        </div>
      </div>
    </BaseMoment>
  );
});

export default GalleryMoment;
