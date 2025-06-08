import { customProviderStorybookDecorator } from '../../stories/decorators';
import StoriesAPICollections from './StoriesAPICollections';

export default {
  argTypes: {
    projectId: {
      control: {
        type: 'number',
      },
      description: 'Project ID',
    },
    enableAllCollections: {
      control: {
        type: 'boolean',
      },
      description: 'Enable all collections',
    },
  },
  component: StoriesAPICollections,
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
  title: 'Stories API Collections',
};

export const Collections = {
  args: {
    alwaysEnableSearch: true,
    projectId: 1,
    editable: true,
    enableAllCollections: true,
  },
};
