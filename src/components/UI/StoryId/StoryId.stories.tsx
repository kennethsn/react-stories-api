import type { Meta, StoryObj } from '@storybook/react-vite';
import type { FC } from 'react';

import { baseStorybookDecorator } from '../../../stories/decorators';
import type { StorySummary } from '../../../types';
import StoryId from './StoryId';

const mockStory: StorySummary = {
  badge: 'Featured',
  collection_id: 1,
  collection_name: 'Sample Collection',
  description: 'A sample story for demonstration',
  id: 'story-demo-001',
  label: 'Demo Story',
  status: 'PUBLISHED',
};

const meta = {
  title: 'UI/StoryId',
  component: StoryId,
  decorators: [
    (StorybookStory: FC) => (
      <div style={{ border: '1px solid #e5e5e5', padding: '16px' }}>
        {baseStorybookDecorator(StorybookStory)}
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StoryId>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    story: mockStory,
  },
};

export const WithExternalLink: Story = {
  args: {
    story: mockStory,
    externalUrl: 'https://example.com/story/story-demo-001',
  },
};

export const WithLimitedActions: Story = {
  args: {
    story: mockStory,
    actions: ['story', 'clipboard'],
  },
};

export const OnlyClipboard: Story = {
  args: {
    story: mockStory,
    actions: ['clipboard'],
  },
};

export const CustomTypography: Story = {
  args: {
    story: mockStory,
    variant: 'body2',
    color: 'primary',
    sx: { fontWeight: 'bold' },
  },
};

export const AsCaption: Story = {
  args: {
    story: mockStory,
    variant: 'caption',
    color: 'textSecondary',
  },
};

export const SpanishLocale: Story = {
  args: {
    story: mockStory,
    externalUrl: 'https://example.com/story/story-demo-001',
  },
  parameters: {
    locale: 'es',
  },
};
