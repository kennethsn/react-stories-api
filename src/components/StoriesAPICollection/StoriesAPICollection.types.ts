import type { AtLeastOne, Collection, CollectionId } from '../../types';
import type { CollectionProps } from '../Collection';

export type StoriesAPICollectionProps = Omit<CollectionProps, 'collection'> & AtLeastOne<{
  readonly collectionId: CollectionId;
  readonly connectRouter: boolean;
}> & {
  readonly editable?: boolean;
  readonly onSave?: (collection: Collection) => Promise<void>;
};
