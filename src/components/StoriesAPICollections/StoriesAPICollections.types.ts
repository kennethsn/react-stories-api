import type { ProjectId, StoriesAPIStatus, StoryIdAction } from '../../types';
import type { CollectionsProps } from '../Collections/Collections.types';

export type StoriesAPICollectionsProps = Omit<CollectionsProps, 'collections'> & {
  readonly featured?: boolean;
  readonly projectId?: ProjectId;
  readonly statuses?: StoriesAPIStatus[];
  readonly storyIdActions?: StoryIdAction[];
};
