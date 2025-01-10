import type { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

import StoriesAPIProvider from '../providers/StoriesAPIProvider';
import StoryProvider from '../providers/StoryProvider';
import type { Story } from '../types';

export const baseStorybookDecorator = (StorybookStory: FC) => (
  <BrowserRouter>
    <StoriesAPIProvider>
      <StorybookStory />
    </StoriesAPIProvider>
  </BrowserRouter>
);

export const storyStoryBookDecorator = (story: Story) => (StorybookStory: FC) => (
  <div style={{ border: '1px solid #e5e5e5', height: '80vh', width: '100%' }}>
    <StoriesAPIProvider>
      <StoryProvider story={story}>
        <StorybookStory />
      </StoryProvider>
    </StoriesAPIProvider>
  </div>
)