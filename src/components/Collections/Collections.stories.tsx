import type { FC } from 'react';

import StoriesAPIProvider from '../../providers/StoriesAPIProvider';
import CollectionStore from '../../state/collectionStore';
import { baseStorybookDecorator } from '../../stories/decorators';
import yaleClubCollectionsData from '../../tests/fixtures/collections--yale-club.json';
import type { Collection } from '../../types';
import { fakeGoToPath } from '../../utils/debug';
import Collections from './Collections';

const yaleClubCollections = yaleClubCollectionsData.map(
  (data) => new CollectionStore(null as never, { collection: data as Collection }),
);

export default {
  args: {
    collections: yaleClubCollections,
  },
  argTypes: {
  },
  component: Collections,
  decorators: [
    baseStorybookDecorator,
  ],
  parameters: {
    deepControls: { enabled: true },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Collections',
};

export const SampleCollection = {
  args: {
    collections: yaleClubCollections,
  },
};

export const YaleClubCollectionDemo = {
  args: {
    collection: yaleClubCollectionsData,
    layout: 'sections',
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
