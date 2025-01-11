import { Else, If, Then } from 'react-if';

import useStory from '../../hooks/useStory';
import type { StoryLayoutProps } from './StoryLayout.types';
import StoryLayoutDesktop from './StoryLayoutDesktop';
import StoryLayoutFullscreen from './StoryLayoutFullscreen';
import StoryLayoutMobile from './StoryLayoutMobile';

// KSN TODO: Turn back on persistence
export default function StoryLayout({ children }: StoryLayoutProps) {
  const { layoutIsDesktop } = useStory();

  return (
    <StoryLayoutFullscreen>
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
}
