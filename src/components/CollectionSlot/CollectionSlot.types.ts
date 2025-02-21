import type { StoryOrSummary } from '../../types';

export type CollectionSlotProps = object & {
  readonly component: string;
  readonly story?: StoryOrSummary;
};
