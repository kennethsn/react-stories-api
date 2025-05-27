import type { StoriesAPIFormatters } from '../types';

const defaultFormatters: StoriesAPIFormatters = {
  collectionPageTitle: '{collection_name}',
  collectionPath: '/collections/{collection_id}',
  collectionStoriesListHeader: 'Explore All Stories from the {collection_name} Collection',
  momentPath: '/collections/{collection_id}/stories/{story_id}?moment={moment_id}',
  momentQueryParamKey: 'moment',
  storyCollectionButtonLabel: 'Explore More Stories',
  storyPageTitle: '{story_label} - {collection_name}',
  storyPath: '/collections/{collection_id}/stories/{story_id}',
};

export default defaultFormatters;
