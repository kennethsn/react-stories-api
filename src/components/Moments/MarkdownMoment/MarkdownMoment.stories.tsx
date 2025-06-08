import { storyStoryBookDecorator } from '../../../stories/decorators';
import MarkdownMoment from './MarkdownMoment';

const momentData = {
  index: 0,
  type: 'markdown',
  title: 'Markdown Moment Example',
  subtitle: null,
  icon: { name: 'article', type: 'mui' },
  color: {
    type: 'hex',
    background: '#7dbbb1',
    text: '#757575',
  },
  label: 'Markdown Example',
  reference: null,
  data: {
    content: `
    # Welcome to the Yale Club

    **Click here to explore more about our legacy!**

    ---

    - Rich history
    - Inspiring Stories
    `,
  },
};

export default {
  args: {
    moment: momentData,
  },
  argTypes: {
    'moment.data.content': {
      control: 'text',
      name: 'Markdown Content',
    },
  },
  component: MarkdownMoment,
  decorators: [
    storyStoryBookDecorator(),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Moments/Markdown Moment',
};

export const DefaultMarkdownMoment = {
  name: 'Default Markdown',
};

export const CardMarkdown = {
  args: {
    'moment.data.content': `
      # Welcome to the Yale Club

    **Click here to explore more about our legacy!**

    ---

    - Rich history
    - Inspiring Stories
    `,
  },
  name: 'Card Markdown',
};
