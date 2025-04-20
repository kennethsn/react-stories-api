import type CardsBaseMomentStore from '../../../state/moments/cardsBaseMomentStore';
import type { CardsProps } from '../../UI/Cards/Cards.types';
import type { BaseMomentProps } from '../BaseMoment/BaseMoment.types';

export type CardsBaseMomentProps<T extends CardsBaseMomentStore<object>> = BaseMomentProps<T> & {
  readonly children: CardsProps['children'];
  readonly disableAnimation?: boolean;
};

export type CardsBaseMomentPropsWithoutChildren<T extends CardsBaseMomentStore<object>> = Omit<
CardsBaseMomentProps<T>,
'children'
>;
