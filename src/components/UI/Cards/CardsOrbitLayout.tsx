import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import type { CardsLayoutProps } from './Cards.types';
import CardsItem from './CardsItem';
import styles from './CardsOrbitLayout.styles';

const radius = 500;

const CardsOrbitLayout = observer(({
  children,
  itemSx,
  keyFn,
  onChange,
}: CardsLayoutProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const count = children.length;
  const step = 360 / count;
  const [rotation, setRotation] = useState(0);

  const handleNextCard = () => {
    const newIndex = (activeIndex + 1) % count;
    setActiveIndex(newIndex);
    setRotation((prev) => prev - step);
    onChange?.(newIndex);
  };

  const handlePrevCard = () => {
    const newIndex = (activeIndex - 1 + count) % count;
    setActiveIndex(newIndex);
    setRotation((prev) => prev + step);
    onChange?.(newIndex);
  };

  return (
    <Box sx={styles.orbitLayoutRoot}>
      <Box sx={styles.orbitInner(rotation)}>
        {children.map((child, index) => {
          const angle = (360 / count) * index;
          const relativeAngle = ((index - activeIndex + count) % count) * (360 / count);
          const normalizedAngle = ((relativeAngle + 180) % 360) - 180;
          const scale = 1 - 0.5 * (Math.abs(normalizedAngle) / 180);

          return (
            <Box key={keyFn(index)} sx={styles.orbitItem(angle, radius, scale)}>
              <CardsItem disableAnimation={false} sx={itemSx}>
                {child}
              </CardsItem>
            </Box>
          );
        })}
      </Box>

      <Box sx={styles.navLeft}>
        <IconButton aria-label="Previous card" onClick={handlePrevCard}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>

      <Box sx={styles.navRight}>
        <IconButton aria-label="Next card" onClick={handleNextCard}>
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
});

export default CardsOrbitLayout;
