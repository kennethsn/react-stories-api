import type CollectionStore from '../../state/collectionStore';

export type CollectionsSectionsProps = {
  readonly buttonLabel?: string;
  readonly collectionPathFormatter?: string;
  readonly collections: CollectionStore[];
  readonly enableAllCollections?: boolean;
};
