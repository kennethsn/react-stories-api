import type { ReactNode } from 'react';

import StoryCard from '../StoryCard/StoryCard';
import Cards from '../UI/Cards/Cards';
import styles from './StoryCards.styles';
import type { StoryCardsProps } from './StoryCards.types';

// Overload signatures
export default function StoryCards(props: StoryCardsProps & { array: true }): ReactNode[];
export default function StoryCards(props: StoryCardsProps): ReactNode;

export default function StoryCards({
  array,
  stories,
  slotComponent: SlotComponent,
  ...cardsProps
}: StoryCardsProps): ReactNode | ReactNode[] {
  const cards = stories.map((story) => (
    <StoryCard
      key={story.id}
      // KSN TODO: make configurable
      buttonLabel="Learn More"
      slot={SlotComponent ? <SlotComponent story={story} /> : null}
      story={story}
      sx={styles.storyCard}
    />
  ));
  return array ? cards : (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Cards {...cardsProps}>
      {cards}
    </Cards>
  );
}
