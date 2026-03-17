import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { ErrorBoundaryContext } from 'react-use-error-boundary';
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
import useStoryTheme from '../../hooks/useStoryTheme';
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

const StoryMomentsContainer = observer(() => {
  const { layoutIsMobile } = useStoryTheme();
  const moments = useMoments();

  const handleSlideChange = (swiperInstance: SwiperClass) => {
    moments.goToMomentIndex(swiperInstance.activeIndex);
  };

  const handleSwiper = (swiperInstance: SwiperClass) => {
    moments.setSwiper(swiperInstance);
  };

  let swiperClassName = 'story-moments-container-swiper';
  if (layoutIsMobile) {
    swiperClassName += ' mobile-layout';
  }

  return (
    <Box
      key={`${moments.collectionId}-${moments.storyId}`}
      sx={styles.root}
    >
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
        initialSlide={moments.defaultMomentIndex}
        keyboard={{ enabled: true }}
        modules={modules}
        navigation
        onSlideChange={handleSlideChange}
        onSwiper={handleSwiper}
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

        {moments.moments.map((moment) => (
          <SwiperSlide
            key={moment.key}
            className="story-moment-swiper-slide"
          >
            <ErrorBoundaryContext>
              <StoryMoment
                key={moment.componentKey}
                moment={moment}
              />
            </ErrorBoundaryContext>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
});

export default StoryMomentsContainer;
