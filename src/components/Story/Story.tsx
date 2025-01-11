import StoryLayout from '../StoryLayout/StoryLayout';
import StoryMomentsContainer from '../StoryMomentsContainer/StoryMomentsContainer';
import type { StoryProps } from './Story.types';
import StoryWrapper from './StoryWrapper';

// KSN TODO: Turn back on persistence
// KSN TODO: API will cache switching stories using the provider

export default function Story({ defaultMoment, story, ...props }: StoryProps) {
  return (
    <StoryWrapper
      key={`${story.collection_id}-${story.id}`}
      defaultMoment={defaultMoment}
      story={story}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <StoryLayout>
        <StoryMomentsContainer />
      </StoryLayout>
    </StoryWrapper>
  );
}
