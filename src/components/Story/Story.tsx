import { observer } from 'mobx-react-lite';

import StoryLayout from '../StoryLayout/StoryLayout';
import StoryMomentsContainer from '../StoryMomentsContainer/StoryMomentsContainer';
import type { StoryProps } from './Story.types';
import StoryWrapper from './StoryWrapper';

// KSN TODO: Turn back on persistence
// KSN TODO: API will cache switching stories using the provider

const Story = observer(({ story, ...props }: StoryProps) => (
  <StoryWrapper
    key={`${story.collection_id}-${story.id}`}
    story={story}
      // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    <StoryLayout>
      <StoryMomentsContainer />
    </StoryLayout>
  </StoryWrapper>
));

export default Story;
