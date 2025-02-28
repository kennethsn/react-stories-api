import type { ReactNode } from 'react';

import type { StoryOrSummary } from '../../types';
import type { CardsProps } from '../UI/Cards/Cards.types';

export type StoryCardsProps = Omit<CardsProps, 'children'> & {
  readonly array?: boolean; // return array instead of container
  readonly enableAll?: boolean;
  readonly stories: readonly StoryOrSummary[];
  readonly slotComponent?: (props: { story: StoryOrSummary }) => ReactNode;
};
