import type {
  AtLeastOne,
  CollectionId,
  StoryId,
} from '../../types';
import type { StoryProps } from '../Story/Story.types';

export type StoriesAPIStoryProps = Omit<StoryProps, 'story'> & AtLeastOne<{
  readonly collectionId: CollectionId;
  readonly storyId: StoryId;
  readonly connectRouter: boolean;
}>;
