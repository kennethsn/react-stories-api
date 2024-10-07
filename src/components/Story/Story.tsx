import StoryProvider from '../../providers/StoryProvider';
import StoryLayout from '../StoryLayout/StoryLayout';
import StoryMomentsContainer from '../StoryMomentsContainer/StoryMomentsContainer';
import type { StoryProps } from './Story.types';

// KSN TODO: Turn back on persistence
// KSN TODO: API will cache switching stories using the provider

export default function Story(props: StoryProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StoryProvider {...props}>
      <StoryLayout>
        <StoryMomentsContainer />
      </StoryLayout>
    </StoryProvider>
  );
}
