import { FC } from 'react';

import StoriesAPIProvider from '../../../providers/StoriesAPIProvider';
import StoryProvider from '../../../providers/StoryProvider';
import baseStoryData from '../../../tests/fixtures/story-primitive.json';
import IFrameMoment from './IFrameMoment';
// KSN TODO: wrap storybook container into its own component
const storyData = {
  ...baseStoryData,
};

const momentData = {
  index: 0,
  type: 'iframe',
  title: 'Science Stories',
  subtitle: null,
  icon: { name: 'language', type: 'mui' },
  color: {
    type: 'hex',
    background: '#7dbbb1',
    text: null,
  },
  label: 'Science Stories',
  reference: null,
  data: {
    caption: {
      content: 'Embeddable URL with Caption',
    },
    iframe: {
      // fit: 'card',
      // size: 12,
      url: 'https://sciencestories.io',
    },
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
    'moment.data.iframe.fit': {
      control: 'inline-radio',
      name: 'iframe Fit',
      options: ['card', 'cover', 'full'],
      table: {
        defaultValue: { summary: 'card' },
      },
    },
    'moment.data.iframe.size': {
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
  component: IFrameMoment,
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
  title: 'Moments/iFrame Moment',
};

export const DefaultIFrameMoment = {
  name: 'Default iFrame',
};

export const CardIFrame = {
  args: {
    'moment.data.caption.content': 'Science Stories was founded in 2017',
    'moment.data.caption.position': 'left',
    'moment.data.iframe.fit': 'card',
    'moment.data.iframe.size': 8,
  },
  name: 'Card iFrame',
};
