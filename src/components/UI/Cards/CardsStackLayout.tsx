import 'swiper/css';
import 'swiper/css/effect-cards';

import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import type { Swiper as SwiperClass } from 'swiper';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { deepMerge } from '../../../utils/object';
import styles from './Cards.styles';
import type { CardsLayoutProps } from './Cards.types';
import CardsItem from './CardsItem';

const CardsStackLayout = observer(({
  children,
  disableAnimation,
  itemSx,
  keyFn,
  onChange,
  sx,
}: CardsLayoutProps) => {
  const handleSwiperSlideChange = (swiper: SwiperClass) => {
    onChange?.(swiper.activeIndex);
  };

  return (
    <Box sx={deepMerge(styles.stackLayoutRoot, sx)}>
      <Swiper
        className="cards-stack-layout-swiper"
        effect="cards"
        grabCursor
        modules={[EffectCards]}
        onSlideChange={handleSwiperSlideChange}
      >
        {children.map((item, index) => (
          <SwiperSlide
            key={keyFn(index)}
            className="cards-stack-layout-swiper-slide"
          >
            <CardsItem
              disableAnimation={disableAnimation}
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

export default CardsStackLayout;
