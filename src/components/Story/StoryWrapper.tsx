import { observer } from 'mobx-react-lite';
import { Else, If, Then } from 'react-if';

import StoryProvider from '../../providers/StoryProvider';
import type { StoryWrapperProps } from './Story.types';

const StoryWrapper = observer(({ children, ...props }: StoryWrapperProps) => (
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
));

export default StoryWrapper;
