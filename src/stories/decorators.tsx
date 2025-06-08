import type { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

import baseStoryData from '../tests/fixtures/story-primitive.json';
import StoriesAPIProvider from '../providers/StoriesAPIProvider';
import StoryProvider from '../providers/StoryProvider';
import type { Moment, MomentData, Story } from '../types';
import useMoments from '../hooks/useMoments';
import StoryMoment from '../components/StoryMoment/StoryMoment';
const baseStory: Story = baseStoryData as Story;

export const baseStorybookDecorator = (StorybookStory: FC, providerProps = {}) => (
  <BrowserRouter>
    <StoriesAPIProvider {...providerProps}>
      <StorybookStory />
    </StoriesAPIProvider>
  </BrowserRouter>
);

export const customProviderStorybookDecorator = (providerProps = {}) => (
  StorybookStory: FC,
) => baseStorybookDecorator(StorybookStory, providerProps);


const InnerMomentWrapper = () => {
  const moments = useMoments();
  return (
    <StoryMoment moment={moments.activeMoment!} />
  )
}

export const momentStoryBookDecorator = (_: never, { args: { moment } }: { args: { moment: Moment<MomentData> } }) => {
  return storyStoryBookDecorator({ ...baseStory, moments: [moment] })(InnerMomentWrapper);
};

export const storyStoryBookDecorator = (story: Partial<Story> = {}) => (StorybookStory: FC) => (
  <BrowserRouter>
    <div style={{ border: '1px solid #e5e5e5', height: '80vh', width: '100%' }}>
      <StoriesAPIProvider>
        <StoryProvider story={{ ...baseStory, ...story }}>
          <StorybookStory />
        </StoryProvider>
      </StoriesAPIProvider>
    </div>
  </BrowserRouter>
);
