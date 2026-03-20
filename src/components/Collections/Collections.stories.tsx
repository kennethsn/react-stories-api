import type { FC } from 'react';
import { useMemo } from 'react';

import StoriesAPIProvider from '../../providers/StoriesAPIProvider';
import CollectionStore from '../../state/collectionStore';
import RootStore from '../../state/rootStore';
import { baseStorybookDecorator } from '../../stories/decorators';
import yaleClubCollectionsData from '../../tests/fixtures/collections--yale-club.json';
import type { Collection } from '../../types';
import { fakeGoToPath } from '../../utils/debug';
import Collections from './Collections';

type CollectionsStoryArgs = {
  readonly buttonLabel?: string;
  readonly collectionPathFormatter?: string;
  readonly collectionsData: Collection[];
  readonly isAllCollectionsEnabled?: boolean;
  readonly layout?: 'list' | 'sections';
};

const buildCollectionsStores = (collectionsData: Collection[]) => {
  const rootStore = new RootStore();
  return collectionsData.map((collection) => new CollectionStore(rootStore, { collection }));
};

function StoryRenderer({
  buttonLabel = undefined,
  collectionPathFormatter = undefined,
  collectionsData,
  isAllCollectionsEnabled = undefined,
  layout = undefined,
}: CollectionsStoryArgs) {
  const collections = useMemo(
    () => buildCollectionsStores(collectionsData),
    [collectionsData],
  );

  return (
    <Collections
      buttonLabel={buttonLabel}
      collectionPathFormatter={collectionPathFormatter}
      collections={collections}
      enableAllCollections={isAllCollectionsEnabled}
      layout={layout}
    />
  );
}

function renderStory(args: CollectionsStoryArgs) {
  return (
    <StoryRenderer
      buttonLabel={args.buttonLabel}
      collectionPathFormatter={args.collectionPathFormatter}
      collectionsData={args.collectionsData}
      isAllCollectionsEnabled={args.isAllCollectionsEnabled}
      layout={args.layout}
    />
  );
}

export default {
  args: {
    collectionsData: yaleClubCollectionsData as Collection[],
  },
  argTypes: {
    collectionsData: {
      control: false,
      table: { disable: true },
    },
  },
  component: Collections,
  decorators: [
    baseStorybookDecorator,
  ],
  parameters: {
    layout: 'centered',
  },
  render: renderStory,
  tags: ['autodocs'],
  title: 'Collections',
};

export const SampleCollection = {
  args: {
    collectionsData: yaleClubCollectionsData as Collection[],
  },
};

export const YaleClubCollectionDemo = {
  args: {
    collectionsData: yaleClubCollectionsData as Collection[],
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
