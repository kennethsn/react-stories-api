import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { Else, If, Then } from 'react-if';

import { STORY_ANIMATION_SPEED } from '../../constants';
import useStoryTheme from '../../hooks/useStoryTheme';
import { deepMerge } from '../../utils';
import Animation from '../UI/Animation/Animation';
import styles from './StoryLayout.styles';
import type { StoryLayoutProps } from './StoryLayout.types';

const StoryLayoutFullscreen = observer(({ children, sx: sxProp }: StoryLayoutProps) => {
  const { layoutIsFullscreen } = useStoryTheme();
  const sx = deepMerge(styles.root(layoutIsFullscreen), sxProp);
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
});

export default StoryLayoutFullscreen;
