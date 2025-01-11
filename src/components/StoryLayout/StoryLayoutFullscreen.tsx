import Box from '@mui/material/Box';
import { Else, If, Then } from 'react-if';

import { STORY_ANIMATION_SPEED } from '../../constants';
import useStory from '../../hooks/useStory';
import Animation from '../UI/Animation/Animation';
import styles from './StoryLayout.styles';
import type { StoryLayoutProps } from './StoryLayout.types';

export default function StoryLayoutFullscreen({ children }: StoryLayoutProps) {
  const { layoutIsFullscreen } = useStory();
  const sx = styles.root(layoutIsFullscreen);
  return (
    <If condition={layoutIsFullscreen}>
      <Then>
        <Animation
          animation="fade"
          persist
          speed={STORY_ANIMATION_SPEED}
        >
          <Box sx={sx}>
            {children}
          </Box>
        </Animation>
      </Then>

      <Else>
        <Box sx={sx}>
          {children}
        </Box>
      </Else>
    </If>
  );
}
