import { FC } from 'react';

import StoriesAPIProvider from '../../../providers/StoriesAPIProvider';
import StoryProvider from '../../../providers/StoryProvider';
import baseStoryData from '../../../tests/fixtures/story-primitive.json';
import YouTubeMoment from './YouTubeMoment';
// KSN TODO: wrap storybook container into its own component
const storyData = {
  ...baseStoryData,
};

const momentData = {
  index: 0,
  type: 'youTube',
  title: 'Welcome to Science Stories',
  subtitle: null,
  icon: { type: 'mui', name: 'youtube_activity' },
  color: {
    type: 'hex',
    background: '#c35400',
    text: null,
  },
  label: 'Welcome to Science Stories',
  reference: null,
  data: {
    caption: {
      content: 'Embeddable URL with Caption',
    },
    url: 'https://www.youtube.com/watch?v=_xMjPB0b0IQ',
  },
};
// TODO: Abstract out argtyps below
export default {
  args: {
    moment: momentData,
  },
  argTypes: {
    'moment.data.caption.content': {
      control: 'text',
      name: 'Caption Content',
    },
    'moment.data.caption.fit': {
      control: 'inline-radio',
      name: 'Caption Fit',
      options: ['card', 'full-width'],
      table: {
        defaultValue: { summary: 'full-width' },
      },
    },
    'moment.data.caption.position': {
      control: 'inline-radio',
      name: 'Caption Position',
      options: ['bottom', 'left', 'right', 'top'],
      table: {
        defaultValue: { summary: 'bottom' },
      },
    },
    'moment.data.fit': {
      control: 'inline-radio',
      name: 'iframe Fit',
      options: ['card', 'cover', 'full'],
      table: {
        defaultValue: { summary: 'card' },
      },
    },
    'moment.data.size': {
      control: {
        min: 1,
        max: 12,
        step: 1,
        type: 'number',
      },
      name: 'iframe Size',
    },
    'moment.data.url': {
      name: 'Embed URL',
    },
  },
  component: YouTubeMoment,
  decorators: [
    (StorybookStory: FC) => (
      <div style={{ border: '1px solid #e5e5e5', height: '80vh', width: '100%' }}>
        <StoriesAPIProvider>
          <StoryProvider story={storyData}>
            <StorybookStory />
          </StoryProvider>
        </StoriesAPIProvider>
      </div>
    ),
  ],
  parameters: {
    deepControls: { enabled: true },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Moments/YouTube Moment',
};

export const DefaultYouTubeMoment = {
  name: 'Default YouTube',
};

export const CardYouTube = {
  args: {
    'moment.data.caption.content': 'Science Stories welcome video brought to you by YouTube',
    'moment.data.caption.position': 'left',
    'moment.data.fit': 'card',
    'moment.data.size': 8,
  },
  name: 'Card iFrame',
};
