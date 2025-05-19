import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import type CardsBaseMomentStore from '../../../state/moments/cardsBaseMomentStore';
import { deepMerge } from '../../../utils/object';
import Cards from '../../UI/Cards/Cards';
import BaseMoment from '../BaseMoment/BaseMoment';
import styles from './CardsBaseMoment.styles';
import type { CardsBaseMomentProps } from './CardsBaseMoment.types';
import CardsBaseMomentStackCaption from './CardsBaseMomentStackCaption';

// KSN TODO: Ensure changing width of sidebar makes the cards responsive
const CardsBaseMoment = observer(<T extends CardsBaseMomentStore<object, object>>({
  children,
  gridColumnsMax,
  moment,
  sx,
}: CardsBaseMomentProps<T>) => {
  const handleChange = (index: number) => {
    moment.setActiveItemIndex(index);
  };
  return (
    <BaseMoment
      contentFit={moment.fit}
      contentSize={moment.size}
      moment={moment}
    >
      <Box
        className="cards-base-moment"
        sx={styles.cardsContainer(moment.layout)}
      >
        <Cards
          disableAnimation={moment.disableAnimation}
          gridColumnsMax={gridColumnsMax}
          layout={moment.layout}
          onChange={handleChange}
          sx={deepMerge(styles.cards(moment, moment.layout), sx)}
        >
          {children}
        </Cards>

        <When condition={moment.layout === 'stack' && moment.shouldShowCaption}>
          <CardsBaseMomentStackCaption moment={moment} />
        </When>
      </Box>
    </BaseMoment>
  );
});

export default CardsBaseMoment;
