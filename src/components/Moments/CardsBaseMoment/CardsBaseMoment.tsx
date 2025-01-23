import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';

import type CardsBaseMomentStore from '../../../state/moments/cardsBaseMomentStore';
import Cards from '../../UI/Cards/Cards';
import BaseMoment from '../BaseMoment/BaseMoment';
import styles from './CardsBaseMoment.styles';
import type { CardsBaseMomentProps } from './CardsBaseMoment.types';

// KSN TODO: Ensure changing width of sidebar makes the cards responsive
const CardsBaseMoment = observer(<T extends CardsBaseMomentStore<object>>({
  children,
  moment,
}: CardsBaseMomentProps<T>) => (
  <BaseMoment
    contentFit={moment.fit}
    contentSize={moment.size}
    moment={moment}
  >
    <Box sx={styles.cardsContainer(moment.layout)}>
      <Cards layout={moment.layout}>
        {children}
      </Cards>
    </Box>
  </BaseMoment>
  ));

export default CardsBaseMoment;
