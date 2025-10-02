import 'swiper/css';
import 'swiper/css/pagination';

import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import type { Swiper as SwiperClass } from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { deepMerge } from '../../../utils';
import styles from './Cards.styles';
import type { CardsLayoutProps } from './Cards.types';
import CardsItem from './CardsItem';

const CardsCarouselLayout = observer(({
  children,
  itemSx,
  keyFn,
  layoutOptions,
  onChange,
  sx,
}: CardsLayoutProps) => {
  const handleSlideChange = (swiper: SwiperClass) => {
    onChange?.(swiper.activeIndex);
  };

  const shouldAutoplay = Boolean(layoutOptions?.autoplay);
  const autoPlay = shouldAutoplay ? ({
    delay: 3000, // ms between auto swipes
    disableOnInteraction: false, // keeps autoplay after user swipes
  }) : undefined;

  const slidesPerView = layoutOptions?.slides_per_view ?? 3;
  const slideGap = layoutOptions?.slide_gap ?? 16;

  return (
    <Box sx={deepMerge(styles.carouselLayoutRoot, sx)}>
      <Swiper
        autoplay={autoPlay}
        className="cards-carousel-layout-swiper"
        grabCursor
        loop
        modules={[Autoplay, Pagination]}
        onSlideChange={handleSlideChange}
        pagination={{
          clickable: true,
        }}
        slidesPerView={slidesPerView}
        spaceBetween={slideGap}
      >
        {children.map((item, index) => (
          <SwiperSlide
            key={keyFn(index)}
            className="cards-carousel-layout-swiper-slide"
          >
            <CardsItem
              sx={itemSx}
            >
              {item}
            </CardsItem>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
});

export default CardsCarouselLayout;
