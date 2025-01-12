import type { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

import baseStoryData from '../tests/fixtures/story-primitive.json';
import StoriesAPIProvider from '../providers/StoriesAPIProvider';
import StoryProvider from '../providers/StoryProvider';
import type { Story } from '../types';

const baseStory: Story = baseStoryData as Story;

export const baseStorybookDecorator = (StorybookStory: FC) => (
  <BrowserRouter>
    <StoriesAPIProvider>
      <StorybookStory />
    </StoriesAPIProvider>
  </BrowserRouter>
);

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
)