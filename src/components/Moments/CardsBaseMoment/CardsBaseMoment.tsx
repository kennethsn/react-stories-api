import Box from '@mui/material/Box';

import { MOMENT_LAYOUT_MAX_CONTENT_SIZE as maxContentSize } from '../../../constants';
import Cards from '../../UI/Cards/Cards';
import BaseMoment from '../BaseMoment/BaseMoment';
import styles from './CardsBaseMoment.styles';
import type { CardsBaseMomentProps } from './CardsBaseMoment.types';

export default function CardsBaseMoment({
  children,
  layout: defaultLayout,
  moment,
}: CardsBaseMomentProps) {
  const { data: { fit = 'full', layout: momentLayout, size = maxContentSize } } = moment;
  const layout = momentLayout ?? defaultLayout;
  return (
    <BaseMoment
      contentFit={fit}
      contentSize={size}
      moment={moment}
    >
      <Box sx={styles.cardsContainer(layout)}>
        <Cards layout={layout}>
          {children}
        </Cards>
      </Box>
    </BaseMoment>
  );
}
