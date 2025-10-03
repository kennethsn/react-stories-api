import { observer } from 'mobx-react-lite';

import { Content } from '../../UI/Content';
import CardsBaseMoment from '../CardsBaseMoment/CardsBaseMoment';
import styles from './CardsContentMoment.styles';
import type { CardsContentMomentProps } from './CardsContentMoment.types';

const key = (index: number) => `${index}`;

const CardsContentMoment = observer(({ moment }: CardsContentMomentProps) => (
  <CardsBaseMoment
    gridColumnsMax={moment.gridColumnsMax}
    moment={moment}
  >
    {moment.cards.map((card, index) => (
      <Content
        key={card.id || key(index)}
        content={card}
        sx={styles.cardContent}
        sxBlockMap={styles.cardContentBlockMap}
      />
    ))}
  </CardsBaseMoment>
));

export default CardsContentMoment;
