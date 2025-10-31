import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import type { Swiper as SwiperClass } from 'swiper';
import { FreeMode, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { deepMerge } from '../../../utils';
import styles from './Cards.styles';
import type { CardsLayoutProps } from './Cards.types';
import CardsItem from './CardsItem';

const CardsRowLayout = observer(({
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

  const slideGap = layoutOptions?.slide_gap ?? 8;
  const shouldAutoplay = Boolean(layoutOptions?.autoplay);
  const autoplay = shouldAutoplay ? ({
    delay: 4000, // ms between auto swipes
    disableOnInteraction: false, // keeps autoplay after user swipes
  }) : undefined;

  return (
    <Box sx={deepMerge(styles.rowLayoutRoot, sx)}>
      <Swiper
        autoplay={autoplay}
        centerInsufficientSlides
        className="cards-row-layout-swiper"
        freeMode
        grabCursor
        modules={[FreeMode, Mousewheel]}
        mousewheel={{ forceToAxis: true }}
        nested
        onSlideChange={handleSlideChange}
        slidesOffsetAfter={24}
        slidesOffsetBefore={24}
        slidesPerView="auto"
        spaceBetween={slideGap}
      >
        {children.map((item, index) => (
          <SwiperSlide
            key={keyFn(index)}
            className="cards-row-layout-swiper-slide"
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

export default CardsRowLayout;
