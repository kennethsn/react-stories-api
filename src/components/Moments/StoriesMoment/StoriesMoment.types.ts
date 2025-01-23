import type StoriesMomentStore from '../../../state/moments/storiesMomentStore';
import type {
  CardsBaseMomentPropsWithoutChildren,
} from '../CardsBaseMoment/CardsBaseMoment.types';

export type StoriesMomentProps = Omit<
CardsBaseMomentPropsWithoutChildren<StoriesMomentStore>,
'layout'>;
