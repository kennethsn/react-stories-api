import { FC } from 'react';

import StoriesAPIProvider from '../../providers/StoriesAPIProvider';
import storyData from '../../tests/fixtures/grace-hopper-story-v1.json';
import yaleClubStoryData from '../../tests/fixtures/story--yale-club--17-madison-square-north.json';
import Story from './Story';
// KSN TODO: Clean this up after building core pipeline
// KSN TODO: Show code button broken bc grace hopper story too big
export default {
  argTypes: {
    // children: {
    //   control: {
    //     type: 'text',
    //   },
    //   description: 'The children of the Page',
    // },
    // story: {
    //   control: {
    //     type: 'object',
    //   },
    //   description: 'The Story object',

    // },
    // title: {
    //   control: {
    //     type: 'text',
    //   },
    //   description: 'The title of the Page',
    // },
  },
  component: Story,
  decorators: [
    (StorybookStory: FC) => (
      <div style={{ border: '1px solid #e5e5e5', height: '80vh', width: '100%' }}>
        <StoriesAPIProvider>
          <StorybookStory />
        </StoriesAPIProvider>
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Story',
};

export const SampleStory = {
  args: {
    story: storyData,
  },
};

export const MobileStory = {
  args: {
    layout: 'mobile',
    story: storyData,
  },
};

export const StoryWithBranding = {
  args: {
    branding: (
      <div style={{ padding: '16px 16px 0px 16px' }}>
        <img
          alt="Science Stories"
          src="https://sciencestories.io/static/images/branding/logo_black.png"
        />
      </div>
    ),
    story: storyData,
  },
};

export const YaleClubStoryDemo = {
  args: {
    story: yaleClubStoryData,
  },
  decorators: [
    (StorybookStory: FC) => (
      <div style={{ border: '1px solid #e5e5e5', height: '80vh', width: '100%' }}>
        <StoriesAPIProvider
          isDebugging
          theme={{ palette: { primary: { main: '#00356b' }, secondary: { main: '#74a0ce' } } }}
        >
          <StorybookStory />
        </StoriesAPIProvider>
      </div>
    ),
  ],
};
