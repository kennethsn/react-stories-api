import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { observer } from 'mobx-react-lite';
import { useRef, useState } from 'react';

import useMoments from '../../hooks/useMoments';
import useOnLoad from '../../hooks/useOnLoad';
import useStoryTheme from '../../hooks/useStoryTheme';
import MomentBodyLayout from '../MomentBodyLayout/MomentBodyLayout';
import MomentHeader from '../MomentHeader/MomentHeader';
import CollapseButton from '../UI/CollapseButton/CollapseButton';
import styles from './MomentLayout.styles';
import type { MomentLayoutProps } from './MomentLayout.types';

// KSN TODO: ref doesn't re-compute clientHeight on resize or collapsing header.
const MomentLayout = observer(({
  actions,
  children,
  contentFit,
  contentSize,
  hideContent,
  moment,
  noContentElevation,
}: MomentLayoutProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [headerIsCollapsed, setHeaderIsCollapsed] = useState(false);
  const moments = useMoments();
  const muiTheme = useTheme();
  const { layoutIsDesktop } = useStoryTheme();
  useOnLoad(() => {
    moments.setMomentRef(moment, ref);
    moment.setMuiTheme(muiTheme);
  });

  const handleHeaderCollapseButtonClick = (collapsed: boolean) => setHeaderIsCollapsed(collapsed);
  return (
    <Box sx={styles.root}>
      <Box sx={styles.headerContainer}>
        <Collapse in={!headerIsCollapsed}>
          <MomentHeader
            actions={actions}
            moment={moment}
          />
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
          hideContent={hideContent}
          moment={moment}
          noContentElevation={noContentElevation}
        >
          {children}
        </MomentBodyLayout>
      </Box>
    </Box>
  );
});

export default MomentLayout;
