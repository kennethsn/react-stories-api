import { momentStoryBookDecorator } from '../../../stories/decorators';

const momentData = {
  index: 0,
  type: 'text',
  title: 'Text Moment Example',
  subtitle: null,
  icon: { name: 'text_snippet', type: 'mui' },
  color: {
    type: 'hex',
    background: '#7dbbb1',
    text: null,
  },
  label: 'Text Eample',
  reference: null,
  data: {
    caption: {
      content: 'A simple text moment',
      position: 'top',
    },
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
    'moment.data.caption.position': {
      control: 'inline-radio',
      name: 'Caption Position',
      options: ['bottom', 'left', 'right', 'top'],
      table: {
        defaultValue: { summary: 'bottom' },
      },
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
  title: 'Moments/Text Moment',
};

export const DefaultTextMoment = {
  name: 'Default Text',
};

export const CardIFrame = {
  args: {
    'moment.data.caption.content': 'Another example of a text moment',
    'moment.data.caption.position': 'top',
  },
  name: 'Card Text',
};
