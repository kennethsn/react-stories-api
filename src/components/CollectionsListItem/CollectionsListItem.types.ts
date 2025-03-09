import type { CollectionStore } from '../../state';

export type CollectionsListItemProps = {
  readonly collection: CollectionStore;
  readonly enabled?: boolean;
};
