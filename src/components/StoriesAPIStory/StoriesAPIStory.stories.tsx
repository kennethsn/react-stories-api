import { customProviderStorybookDecorator } from '../../stories/decorators';
import StoriesAPIStory from './StoriesAPIStory';

export default {
  argTypes: {
    collectionId: {
      control: {
        type: 'number',
      },
      description: 'Collection ID',
    },
    storyId: {
      control: {
        type: 'number',
      },
      description: 'Story ID',
    },
  },
  component: StoriesAPIStory,
  decorators: [
    customProviderStorybookDecorator({
      api: {
        apiKey: 'some-api-key',
        baseURL: 'http://127.0.0.1:8000',
      },
    }),
  ],
  parameters: {
    deepControls: { enabled: true },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Stories API Story',
};

export const Story = {
  args: {
    collectionId: 1,
    editable: true,
    fullscreen: true,
    storyId: 'Q123',
  },
};
