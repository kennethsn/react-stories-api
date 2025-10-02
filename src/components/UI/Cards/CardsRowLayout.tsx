import 'swiper/css';
import 'swiper/css/free-mode';

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

  const slidesPerView = layoutOptions?.slides_per_view ?? 3;
  const slideGap = layoutOptions?.slide_gap ?? 8;

  return (
    <Box sx={deepMerge(styles.rowLayoutRoot, sx)}>
      <Swiper
        className="cards-row-layout-swiper"
        freeMode
        grabCursor
        loop
        modules={[FreeMode, Mousewheel]}
        mousewheel={{ forceToAxis: true }}
        onSlideChange={handleSlideChange}
        slidesPerView={slidesPerView}
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
