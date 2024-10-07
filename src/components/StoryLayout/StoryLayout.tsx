import Box from '@mui/material/Box';
import { Else, If, Then } from 'react-if';

import useStory from '../../hooks/useStory';
import styles from './StoryLayout.styles';
import type { StoryLayoutProps } from './StoryLayout.types';
import StoryLayoutDesktop from './StoryLayoutDesktop';
import StoryLayoutMobile from './StoryLayoutMobile';

// KSN TODO: Turn back on persistence
export default function StoryLayout({ children }: StoryLayoutProps) {
  const { layoutIsDesktop } = useStory();

  return (
    <Box sx={styles.root}>
      <If condition={layoutIsDesktop}>
        <Then>
          <StoryLayoutDesktop>
            {children}
          </StoryLayoutDesktop>
        </Then>

        <Else>
          <StoryLayoutMobile>
            {children}
          </StoryLayoutMobile>
        </Else>
      </If>
    </Box>
  );
}
