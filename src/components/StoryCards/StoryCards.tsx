import Box from '@mui/material/Box';
import type { ReactNode } from 'react';

import useLocale from '../../hooks/useLocale';
import { deepMerge } from '../../utils/object';
import StoryCard from '../StoryCard/StoryCard';
import Cards from '../UI/Cards/Cards';
import styles from './StoryCards.styles';
import type { StoryCardsProps } from './StoryCards.types';

// Overload signatures
export default function StoryCards(props: StoryCardsProps & { array: true }): ReactNode[];
export default function StoryCards(props: StoryCardsProps): ReactNode;

export default function StoryCards({
  array,
  cardSx,
  enableAll,
  newTab,
  stories,
  slotComponent: SlotComponent,
  ...cardsProps
}: StoryCardsProps): ReactNode | ReactNode[] {
  const { t } = useLocale();
  const cards = stories.map((story) => (
    <Box
      key={story.id}
      sx={styles.wrapper}
    >
      <StoryCard
      // KSN TODO: make configurable
        buttonLabel={t('learn_more')}
        isDisabled={enableAll ? false : undefined}
        newTab={newTab}
        slot={SlotComponent ? <SlotComponent story={story} /> : null}
        story={story}
        sx={deepMerge(styles.storyCard, cardSx)}
      />
    </Box>
  ));
  return array ? cards : (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Cards {...cardsProps}>
      {cards}
    </Cards>
  );
}
