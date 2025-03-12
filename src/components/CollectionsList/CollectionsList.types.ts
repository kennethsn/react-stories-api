import type CollectionStore from '../../state/collectionStore';

export type CollectionsListProps = {
  readonly collectionPathFormatter?: string;
  readonly collections: CollectionStore[];
  readonly enableAllCollections?: boolean;
};
