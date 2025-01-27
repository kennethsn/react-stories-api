import type { FC } from 'react';

import StoriesAPIProvider from '../../providers/StoriesAPIProvider';
import { baseStorybookDecorator } from '../../stories/decorators';
import yaleClubCollectionData from '../../tests/fixtures/collection--yale-club--they-lived-at-the-club.json';
import baseCollectionData from '../../tests/fixtures/collection-primitive.json';
import { fakeGoToPath } from '../../utils/debug';
import Collection from './Collection';

// KSN TODO: Clean this up after building core pipeline
export default {
  args: {
    collection: baseCollectionData,
    editable: false,
  },
  argTypes: {
    'collection.description': {
      control: 'text',
      name: 'Collection Description',
    },
    'collection.name': {
      control: 'text',
      name: 'Collection Name',
    },
    editable: {
      control: 'boolean',
      name: 'Editable',
    },
  },
  component: Collection,
  decorators: [
    baseStorybookDecorator,
  ],
  parameters: {
    deepControls: { enabled: true },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Collection',
};

export const SampleCollection = {
  args: {
    collection: yaleClubCollectionData,
    editable: true,
  },
};

export const YaleClubCollectionDemo = {
  args: {
    collection: yaleClubCollectionData,
  },
  decorators: [
    (StorybookStory: FC) => (
      <StoriesAPIProvider
        goToPath={fakeGoToPath}
        isDebugging
        theme={{ palette: { primary: { main: '#00356b' }, secondary: { main: '#74a0ce' } } }}
      >
        <StorybookStory />
      </StoriesAPIProvider>
    ),
  ],
};
