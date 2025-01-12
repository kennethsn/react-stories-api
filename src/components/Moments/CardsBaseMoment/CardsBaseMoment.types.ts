import type { CardsLayout, CardsMomentData } from '../../../types';
import type { CardsProps } from '../../UI/Cards/Cards.types';
import type { BaseMomentProps } from '../BaseMoment/BaseMoment.types';

export type CardsBaseMomentProps<T=CardsMomentData> = BaseMomentProps<T> & {
  readonly children: CardsProps['children'];
  readonly layout: CardsLayout;
};

export type CardsBaseMomentPropsWithoutChildren<T=CardsMomentData> = Omit<
CardsBaseMomentProps<T>,
'children'
>;
