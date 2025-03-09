import type { ProjectId, StoriesAPIStatus } from '../../types';

export type StoriesAPICollectionsProps = {
  readonly enableAllCollections?: boolean;
  readonly featured?: boolean;
  readonly projectId?: ProjectId;
  readonly statuses?: StoriesAPIStatus[];
};
