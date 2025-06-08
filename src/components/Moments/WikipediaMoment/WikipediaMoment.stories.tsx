import { momentStoryBookDecorator } from '../../../stories/decorators';

const momentData = {
  index: 0,
  type: 'wikipedia',
  title: 'Lewis Carroll',
  subtitle: null,
  color: {
    type: 'hex',
    background: '#7dbbb1',
    text: null,
  },
  label: 'Wikipedia Example',
  reference: null,
  data: {
    caption: {
      content: 'Embeddable URL generated with a page key',
    },
    page_key: 'Lewis_Carroll',
  },
};

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
    'moment.data.size': {
      control: {
        min: 1,
        max: 12,
        step: 1,
        type: 'number',
      },
      name: 'iframe Size',
    },
    'moment.data.caption.position': {
      control: 'inline-radio',
      name: 'Caption Position',
      options: ['bottom', 'left', 'right', 'top'],
      table: {
        defaultValue: { summary: 'bottom' },
      },
    },
    'moment.data.page_key': {
      control: 'text',
      name: 'Wikipedia page key',
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
  title: 'Moments/Wikipedia Moment',
};

export const DefaultWikipediaMoment = {
  name: 'Default Wikipedia',
};

export const CardWikipediaMoment = {
  args: {
    'moment.data.caption.content': 'This example demonstrates using a page key from Wikipedia.',
    'moment.data.caption.position': 'left',
    'moment.data.page_key': 'Lewis_Carroll',
  },
  name: 'Card Wikipedia',
};
