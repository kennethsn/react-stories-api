import { type PropsWithChildren, useMemo } from 'react';

import type { CollectionProps } from '../components/Collection/Collection.types';
import CollectionContext, { type ICollectionContext } from '../contexts/CollectionContext';

type CollectionProviderProps = CollectionProps & PropsWithChildren;

export default function CollectionProvider({
  collection,
  children,
}: CollectionProviderProps) {
  const contextValue = useMemo<ICollectionContext>(
    () => {
      const {
        id: collectionId,
        featured_stories: initFeaturedStories,
        stories: initStories,
        total_stories_count: initTotalStoriesCount,
      } = collection;
      const featuredStories = initFeaturedStories || [];
      const featuredStoriesCount = featuredStories.length;
      const stories = initStories || [];
      const totalStoriesCount = initTotalStoriesCount ?? stories.length;
      return {
        collection,
        collectionHasFeaturedStories: featuredStoriesCount > 0,
        collectionId,
        featuredStories,
        featuredStoriesCount,
        stories,
        totalStoriesCount,
      };
    },
    [collection],
  );

  return (
    <CollectionContext.Provider value={contextValue}>
      {children}
    </CollectionContext.Provider>
  );
}
