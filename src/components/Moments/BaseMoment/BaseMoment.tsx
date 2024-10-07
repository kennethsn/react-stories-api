import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { useState } from 'react';

import useStory from '../../../hooks/useStory';
import MomentHeader from '../../MomentHeader/MomentHeader';
import CollapseButton from '../../UI/CollapseButton/CollapseButton';
import styles from './BaseMoment.styles';
import type { BaseMomentProps } from './BaseMoment.types';

export default function BaseMoment({ children, moment }: BaseMomentProps) {
  const [headerIsCollapsed, setHeaderIsCollapsed] = useState(false);
  const { layoutIsDesktop } = useStory();
  const handleHeaderCollapseButtonClick = (collapsed: boolean) => setHeaderIsCollapsed(collapsed);
  return (
    <Box sx={styles.root}>
      <Box sx={styles.headerContainer}>
        <Collapse in={!headerIsCollapsed}>
          <MomentHeader moment={moment} />
        </Collapse>

        <CollapseButton
          collapsed={headerIsCollapsed}
          onClick={handleHeaderCollapseButtonClick}
          showOnHover={layoutIsDesktop}
          sx={styles.headerCollapseButton}
        />
      </Box>

      <Box
        data-swiper-parallax="-800"
        sx={styles.contentContainer}
      >
        {children}
      </Box>
    </Box>
  );
}
