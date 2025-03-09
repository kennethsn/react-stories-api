import type { CollectionStore } from '../../state';

export type CollectionsListProps = {
  readonly collections: CollectionStore[];
  readonly enableAllCollections?: boolean;
};
