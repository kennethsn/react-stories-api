import { observer } from 'mobx-react-lite';
import { Else, If, Then } from 'react-if';

import useStoryTheme from '../../hooks/useStoryTheme';
import type { StoryLayoutProps } from './StoryLayout.types';
import StoryLayoutDesktop from './StoryLayoutDesktop';
import StoryLayoutFullscreen from './StoryLayoutFullscreen';
import StoryLayoutMobile from './StoryLayoutMobile';

// KSN TODO: Turn back on persistence
const StoryLayout = observer(({ children, sx }: StoryLayoutProps) => {
  const { layoutIsDesktop } = useStoryTheme();

  return (
    <StoryLayoutFullscreen sx={sx}>
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
    </StoryLayoutFullscreen>
  );
});

export default StoryLayout;
