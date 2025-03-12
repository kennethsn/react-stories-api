import type CollectionStore from '../../state/collectionStore';

export type CollectionsListItemProps = {
  readonly collection: CollectionStore;
  readonly collectionPathFormatter?: string;
  readonly enabled?: boolean;
};
