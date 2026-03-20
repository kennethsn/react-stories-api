import { useMemo } from 'react';

import CollectionStore from '../../state/collectionStore';
import RootStore from '../../state/rootStore';
import { baseStorybookDecorator } from '../../stories/decorators';
import yaleClubCollectionData from '../../tests/fixtures/collection--yale-club--they-lived-at-the-club.json';
import baseCollectionData from '../../tests/fixtures/collection-primitive.json';
import type { Collection } from '../../types';
import CollectionSection from './CollectionSection';

type CollectionSectionStoryArgs = {
  readonly buttonLabel?: string;
  readonly collectionData: Collection;
  readonly collectionPathFormatter?: string;
  readonly isEnabled?: boolean;
};

const buildCollectionStore = (collectionData: Collection) => new CollectionStore(
  new RootStore(),
  { collection: collectionData },
);

function StoryRenderer({
  buttonLabel = undefined,
  collectionData,
  collectionPathFormatter = undefined,
  isEnabled = undefined,
}: CollectionSectionStoryArgs) {
  const collectionStore = useMemo(
    () => buildCollectionStore(collectionData),
    [collectionData],
  );

  return (
    <CollectionSection
      buttonLabel={buttonLabel}
      collection={collectionStore}
      collectionPathFormatter={collectionPathFormatter}
      enabled={isEnabled}
    />
  );
}

function renderStory(args: CollectionSectionStoryArgs) {
  return (
    <StoryRenderer
      buttonLabel={args.buttonLabel}
      collectionData={args.collectionData}
      collectionPathFormatter={args.collectionPathFormatter}
      isEnabled={args.isEnabled}
    />
  );
}

const unpublishedCollectionData: Collection = {
  ...(baseCollectionData as Collection),
  status: 'PREVIEW',
};

export default {
  args: {
    collectionData: yaleClubCollectionData as Collection,
  },
  argTypes: {
    collectionData: {
      control: false,
      table: { disable: true },
    },
  },
  component: CollectionSection,
  decorators: [
    baseStorybookDecorator,
  ],
  parameters: {
    layout: 'padded',
  },
  render: renderStory,
  tags: ['autodocs'],
  title: 'Collection Section',
};

export const Default = {
  args: {
    collectionData: yaleClubCollectionData as Collection,
  },
};

export const Minimal = {
  args: {
    collectionData: baseCollectionData as Collection,
  },
};

export const UnpublishedNoButton = {
  args: {
    collectionData: unpublishedCollectionData,
  },
};

export const UnpublishedWithEnabledButton = {
  args: {
    collectionData: unpublishedCollectionData,
    isEnabled: true,
  },
};
