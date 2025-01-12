import type { StoriesMomentData } from '../../../types';
import type {
  CardsBaseMomentPropsWithoutChildren,
} from '../CardsBaseMoment/CardsBaseMoment.types';

export type StoriesMomentProps = Omit<
CardsBaseMomentPropsWithoutChildren<StoriesMomentData>,
'layout'>;
