import type { StoryOrSummary } from '../../types';
import type { CardsProps } from '../UI/Cards/Cards.types';

export type StoryCardsProps = Omit<CardsProps, 'children'> & {
  readonly array?: boolean; // return array instead of container
  readonly stories: readonly StoryOrSummary[];
};
