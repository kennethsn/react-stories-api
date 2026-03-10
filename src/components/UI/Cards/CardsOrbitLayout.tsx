import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import type { CardsLayoutProps } from './Cards.types';
import CardsItem from './CardsItem';
import styles from './CardsOrbitLayout.styles';

const CardsOrbitLayout = observer(({
  children,
  keyFn,
  onChange,
}: CardsLayoutProps) => {
  const radius = 500;
  const [activeIndex, setActiveIndex] = useState(0);
  const count = children.length;
  const step = 360 / count;

  const handleNextCard = () => {
    const newIndex = (activeIndex + 1) % count;
    setActiveIndex(newIndex);
    onChange?.(newIndex);
  };

  const handlePrevCard = () => {
    const newIndex = (activeIndex - 1 + count) % count;
    setActiveIndex(newIndex);
    onChange?.(newIndex);
  };

  return (
    <Box sx={styles.orbitLayoutRoot}>
      <Box sx={styles.orbitInner(-(activeIndex * step))}>
        {children.map((child, index) => {
          const angle = index * step;

          return (
            <Box
              key={keyFn(index)}
              sx={styles.orbitItem(
                angle,
                radius,
              )}
            >
              <CardsItem
                disableAnimation={false}
              >
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
