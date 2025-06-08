import { momentStoryBookDecorator } from '../../../stories/decorators';

const momentData = {
  index: 0,
  type: 'html',
  title: 'HTML Moment Example',
  subtitle: null,
  icon: { name: 'code', type: 'mui' },
  color: {
    type: 'hex',
    background: '#7dbbb1',
    text: '#757575',
  },
  label: 'HTML Example',
  reference: null,
  data: {
    content: `
    <h1>Welcome to the Yale Club</h1>
    <p><strong>Click here to explore more about our legacy!</strong></p>
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
      name: 'HTML Content',
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
  title: 'Moments/HTML Moment',
};

export const DefaultHTMLMoment = {
  name: 'Default HTML',
};

export const CardHTMLMoment = {
  args: {
    'moment.data.content': `
      <h2>Custom HTML Content</h2>
      <p>Replace this text with your custom HTML.</p>
      <ul>
        <li>Bullet Point 1</li>
        <li>Bullet Point 2</li>
        <li>Bullet Point 3</li>
      </ul>
    `,
  },
  name: 'Card HTML',
};
