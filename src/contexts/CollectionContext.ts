import { createContext } from 'react';

import type { CollectionProps } from '../components/Collection/Collection.types';
import type { Collection, StorySummary } from '../types';

export type ICollectionContext = CollectionProps & {
  readonly collection: Collection;
  readonly collectionId: Collection['id'];
  readonly collectionHasFeaturedStories: boolean;
  readonly featuredStories: StorySummary[];
  readonly featuredStoriesCount: number;
  readonly stories: StorySummary[];
  readonly totalStoriesCount: number;
};

// KSN TODO: Confirm multiple collections can be loaded on same page
const CollectionContext = createContext<ICollectionContext | null>(null);

export default CollectionContext;
