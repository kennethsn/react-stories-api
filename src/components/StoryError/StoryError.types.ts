import type { CollectionId } from '../../types';

export type StoryErrorProps = {
  readonly collectionId: CollectionId;
  readonly storyId: string;
  readonly isFullscreen?: boolean;
};
