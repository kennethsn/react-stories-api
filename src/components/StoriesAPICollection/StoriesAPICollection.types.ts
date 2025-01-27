import type { AtLeastOne, Collection, CollectionId } from '../../types';

export type StoriesAPICollectionProps = AtLeastOne<{
  readonly collectionId: CollectionId;
  readonly connectRouter: boolean;
}> & {
  readonly editable?: boolean;
  readonly onSave?: (collection: Collection) => Promise<void>;
};
