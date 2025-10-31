import type { Meta, StoryObj } from '@storybook/react-vite';
import { FC } from 'react';

import { baseStorybookDecorator } from '../../../stories/decorators';
import { Content as ContentType } from '../../../types';
import Content from './Content';

const exampleContent: ContentType = {
  id: 'example-content',
  blocks: [
    {
      type: 'IMAGE',
      image: {
        alt: 'Yale University Art Gallery Main Building',
        url: 'http://commons.wikimedia.org/wiki/Special:FilePath/Yale%20Art%20Gallery%20exterior%2001.jpg',
      },
    },
    {
      type: 'TEXT',
      text: 'collection: Yale University Art Gallery (@ Yale University Art Gallery Main Building)',
    },
    {
      type: 'TEXT',
      text: 'art museum in New Haven, Connecticut',
      variant: 'finePrint',
    },
    {
      type: 'BULLETED_LIST',
      items: [
        { text: 'Founded in 1832' },
        { text: 'Free admission' },
        { text: 'Part of Yale University' },
      ],
    },
    {
      type: 'NUMBERED_LIST',
      items: [
        { text: 'Explore exhibits' },
        { text: 'Attend events' },
        { text: 'Visit the gift shop' },
      ],
    },
    {
      type: 'BUTTON',
      button: {
        label: 'Learn More',
        color: { background: 'primary' },
        variant: 'contained',
        is_disabled: false,
        url: 'https://artgallery.yale.edu/',
        new_tab: true,
      },
      background_sx: { p: 2, bgcolor: '#f9f9f9' },
    },
  ],
};

const meta = {
  title: 'Example/Content',
  component: Content,
  decorators: [
    (StorybookStory: FC) => (
      <div style={{ border: '1px solid #e5e5e5', height: '80vh', width: '100%' }}>
        {baseStorybookDecorator(StorybookStory)}
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Content>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: exampleContent,
  },
};
