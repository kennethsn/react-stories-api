import type { StoriesAPIFormatters } from '../types';

const defaultFormatters: StoriesAPIFormatters = {
  collectionPageTitle: '{collectionName}',
  collectionPath: '/collections/{collectionId}',
  collectionStoriesListHeader: 'Explore All Stories from the {collectionName} Collection',
  momentPath: '/collections/{collectionId}/stories/{storyId}?moment={momentId}',
  momentQueryParamKey: 'moment',
  storyCollectionBackButtonLabel: 'Back to Collection',
  storyPageTitle: '{storyLabel} - {collectionName}',
  storyPath: '/collections/{collectionId}/stories/{storyId}',
};

export default defaultFormatters;
