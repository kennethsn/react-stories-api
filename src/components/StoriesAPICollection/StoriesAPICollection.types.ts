import type { AtLeastOne, CollectionId } from '../../types';
import type { CollectionProps } from '../Collection';

export type StoriesAPICollectionProps = Omit<CollectionProps, 'collection'> & AtLeastOne<{
  readonly collectionId: CollectionId;
  readonly connectRouter: boolean;
}> & {
  // Used to manually manage caching rules for multiple instances
  readonly cacheKey?: string;
};
