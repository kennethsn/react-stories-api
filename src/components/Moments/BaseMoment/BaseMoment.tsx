import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { useEffect, useRef, useState } from 'react';

import { useMoments } from '../../../hooks';
import useStory from '../../../hooks/useStory';
import MomentBodyLayout from '../../MomentBodyLayout/MomentBodyLayout';
import MomentHeader from '../../MomentHeader/MomentHeader';
import CollapseButton from '../../UI/CollapseButton/CollapseButton';
import styles from './BaseMoment.styles';
import type { BaseMomentProps } from './BaseMoment.types';
// KSN TODO: ref doesn't re-compute clientHeight on resize or collapsing header.
export default function BaseMoment({
  children,
  contentFit,
  contentSize,
  moment,
}: BaseMomentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [headerIsCollapsed, setHeaderIsCollapsed] = useState(false);
  const { setMomentRef } = useMoments(moment.index);
  const { layoutIsDesktop } = useStory();
  useEffect(() => {
    setMomentRef(ref);
  });

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
        ref={ref}
        data-swiper-parallax="-800"
        sx={styles.contentContainer}
      >
        <MomentBodyLayout
          contentFit={contentFit}
          contentSize={contentSize}
          moment={moment}
        >
          {children}
        </MomentBodyLayout>
      </Box>
    </Box>
  );
}
