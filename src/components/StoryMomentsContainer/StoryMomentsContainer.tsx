import Box from '@mui/material/Box';
import {
  EffectCoverflow,
  Keyboard,
  Navigation,
  Pagination,
  Parallax,
  Virtual,
} from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import useMoments from '../../hooks/useMoments';
import useStory from '../../hooks/useStory';
import StoryMoment from '../StoryMoment/StoryMoment';
import styles from './StoryMomentsContainer.styles';
// KSN TODO: use focusableElements to prevent drag on everything but backgrounds
// https://swiperjs.com/swiper-api#param-focusableElements

const modules = [
  EffectCoverflow,
  Pagination,
  Parallax,
  Keyboard,
  Navigation,
  Virtual,
];

export default function StoryMomentsContainer() {
  const { layoutIsMobile, setSwiper } = useStory();
  const {
    availableMoments: moments,
    defaultMomentIndex,
    selectMoment,
  } = useMoments();

  const handleSlideChange = (swiperInstance: SwiperClass) => {
    selectMoment(swiperInstance.activeIndex);
  };

  let swiperClassName = 'story-moments-container-swiper';
  if (layoutIsMobile) {
    swiperClassName += ' mobile-layout';
  }

  return (
    <Box sx={styles.root}>
      <Swiper
        allowTouchMove={layoutIsMobile}
        className={swiperClassName}
        coverflowEffect={{
          depth: 50,
          modifier: 2,
          rotate: 20,
          slideShadows: true,
          stretch: 0,
        }}
        effect="coverflow"
        initialSlide={defaultMomentIndex}
        keyboard={{ enabled: true }}
        modules={modules}
        navigation
        onSlideChange={handleSlideChange}
        onSwiper={setSwiper}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
        }}
        parallax
        speed={600}
        virtual={layoutIsMobile ? {
          cache: false,
          enabled: true,
        } : undefined}
      >
        <div slot="container-start" />

        {moments.map((moment) => (
          <SwiperSlide
            key={moment.index}
            className="story-moment-swiper-slide"
          >
            <StoryMoment moment={moment} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
