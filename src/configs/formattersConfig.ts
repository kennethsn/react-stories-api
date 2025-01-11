import type { StoriesAPIFormatters } from '../types';

const defaultFormatters: StoriesAPIFormatters = {
  collectionPath: '/collections/{collectionId}',
  collectionStoriesListHeader: 'Explore All Stories from the {collectionName} Collection',
  momentPath: '/collections/{collectionId}/stories/{storyId}?moment={moment}',
  momentQueryParamKey: 'moment',
  storyPath: '/collections/{collectionId}/stories/{storyId}',
  storyCollectionBackButtonLabel: 'Back to Collection',
};

export default defaultFormatters;
