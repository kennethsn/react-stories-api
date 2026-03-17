import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { FC } from 'react';

import { baseStorybookDecorator } from '../../../stories/decorators';
import MenuTooltip from './MenuTooltip';

const meta = {
  title: 'UI/MenuTooltip',
  component: MenuTooltip,
  decorators: [
    (StorybookStory: FC) => (
      <div style={{ minHeight: '240px', padding: '32px' }}>
        {baseStorybookDecorator(StorybookStory)}
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MenuTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

const trigger = (
  <Box
    sx={{
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 1,
      cursor: 'pointer',
      px: 2,
      py: 1,
      userSelect: 'none',
    }}
  >
    Open Menu
  </Box>
);

const menuContent = (
  <Box sx={{ minWidth: 220, p: 2 }}>
    <Typography variant="subtitle2">Menu Tooltip Content</Typography>

    <Typography color="text.secondary" variant="body2">
      Reusable popover menu content.
    </Typography>
  </Box>
);

export const ClickToOpen: Story = {
  args: {
    children: menuContent,
    trigger,
  },
};

export const HoverToOpen: Story = {
  args: {
    children: menuContent,
    hover: true,
    trigger,
  },
};
