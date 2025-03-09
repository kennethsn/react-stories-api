import type { CollectionStore } from '../../state';

export type CollectionsSectionsProps = {
  readonly collections: CollectionStore[];
  readonly enableAllCollections?: boolean;
};
