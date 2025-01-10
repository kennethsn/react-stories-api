import { baseStorybookDecorator } from '../../stories/decorators';
import StoriesAPIButton from './StoriesAPIButton';

export default {
  args: {
    button: {
      color: { background: 'primary', text: '' },
      label: 'Learn More',
      is_disabled: false,
    },
  },
  argTypes: {
    'button.label': {
      control: 'text',
      name: 'Label',
    },
    'button.variant': {
      control: 'inline-radio',
      name: 'Variant',
      options: ['contained', 'outlined', 'text'],
      table: {
        defaultValue: { summary: 'contained' },
      },
    },
    'button.color.background': {
      control: 'text',
      name: 'Background Color',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    'button.color.text': {
      control: 'text',
      description: (
        'By default this will generate a contrasting color based on the background color'
      ),
      name: 'Text Color',
    },
    'button.is_disabled': {
      control: 'boolean',
      defaultValue: { summary: false },
      name: 'Is Disabled?',
    },
  },
  component: StoriesAPIButton,
  decorators: [
    baseStorybookDecorator,
  ],
  parameters: {
    deepControls: { enabled: true },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Button',
};

export const DefaultButton = {
  name: 'Default Button',
};
