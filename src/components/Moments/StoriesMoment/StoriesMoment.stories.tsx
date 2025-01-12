import { storyStoryBookDecorator } from '../../../stories/decorators';
import collectionData from '../../../tests/fixtures/collection--yale-club--they-lived-at-the-club.json';
import momentCaption from '../../../tests/fixtures/vars';
import StoriesMoment from './StoriesMoment';

const momentData = {
  index: 0,
  type: 'stories',
  title: 'Collection of Stories',
  subtitle: 'This moment type allows for story cards to be interlinked',
  label: 'Harpers Bazaar v.42 1908',
  reference: null,
  data: {
    caption: {
      content: 'Embeddable URL with Caption',
    },
    stories: collectionData.stories,
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
  },
  component: StoriesMoment,
  decorators: [
    storyStoryBookDecorator(),
  ],
  parameters: {
    deepControls: { enabled: true },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Moments/Stories Moment',
};

export const DefaultStoriesMoment = {
};

export const SideCaption = {
  args: {
    'moment.data.caption.content': momentCaption,
    'moment.data.caption.position': 'right',
    'moment.data.size': 8,
  },
};
