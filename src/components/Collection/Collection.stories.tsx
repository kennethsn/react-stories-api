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

export const SingleStoryToolLayout = {
  args: {
    collection: {
      id: 2,
      name: 'A Single-Story Collection',
      description: 'This collection has only one story. The stories list below the header should be hidden.',
      status: 'PUBLISHED',
      featured_stories: [
        {
          collection_id: 2,
          collection_name: 'A Single-Story Collection',
          id: 'Q001',
          label: 'The Only Story',
          description: 'There is only one story in this collection.',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Yale_Club_Exterior.tif/lossy-page1-1200px-Yale_Club_Exterior.tif.jpg',
          status: 'PUBLISHED',
        },
      ],
      stories: [
        {
          collection_id: 2,
          collection_name: 'A Single-Story Collection',
          id: 'Q001',
          label: 'The Only Story',
          description: 'There is only one story in this collection.',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Yale_Club_Exterior.tif/lossy-page1-1200px-Yale_Club_Exterior.tif.jpg',
          status: 'PUBLISHED',
        },
      ],
      total_stories_count: 1,
    },
    layout: 'tool',
  },
  parameters: {
    docs: {
      description: {
        story: 'A collection with a single story in the tool layout. The featured story appears in the header, and the stories list section below should be hidden since there is only one total story.',
      },
    },
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
