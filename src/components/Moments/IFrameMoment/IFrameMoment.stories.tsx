import { momentStoryBookDecorator } from '../../../stories/decorators';

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
  decorators: [
    momentStoryBookDecorator,
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
