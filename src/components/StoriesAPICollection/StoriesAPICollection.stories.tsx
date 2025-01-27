import { customProviderStorybookDecorator } from '../../stories/decorators';
import StoriesAPICollection from './StoriesAPICollection';

export default {
  argTypes: {
    collectionId: {
      control: {
        type: 'number',
      },
      description: 'Collection ID',
    },
  },
  component: StoriesAPICollection,
  decorators: [
    customProviderStorybookDecorator({
      api: {
        apiKey: 'some-api-key',
        baseURL: 'http://127.0.0.1:8000',
      },
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Stories API Collection',
};

export const Collection = {
  args: {
    collectionId: 1,
    editable: true,
  },
};
