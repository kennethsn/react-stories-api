import type { ProjectId, StoriesAPIStatus } from '../../types';
import type { CollectionsProps } from '../Collections/Collections.types';

export type StoriesAPICollectionsProps = Omit<CollectionsProps, 'collections'> & {
  readonly featured?: boolean;
  readonly projectId?: ProjectId;
  readonly statuses?: StoriesAPIStatus[];
};
