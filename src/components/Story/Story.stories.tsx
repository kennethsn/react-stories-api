import Story from './Story';
// KSN TODO: Clean this up after building core pipeline
export default {
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'The children of the Page',
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'The title of the Page',
    },
  },
  component: Story,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Story',
};

export const StoryOne = {
  args: {
    children: 'These are the Page One children',
    title: 'This is the Page One title',
  },
};

export const PageTwo = {
  args: {
    children: 'These are the Page Two children',
    title: 'This is the Page Two title',
  },
};
