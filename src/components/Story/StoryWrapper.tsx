import { Else, If, Then } from 'react-if';

import StoryProvider from '../../providers/StoryProvider';
import type { StoryWrapperProps } from './Story.types';

export default function StoryWrapper({ children, ...props }: StoryWrapperProps) {
  return (
    <If condition={!!props.story}>
      <Then>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <StoryProvider {...props}>
          {children}
        </StoryProvider>
      </Then>

      <Else>
        {children}
      </Else>
    </If>
  );
}
