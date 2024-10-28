import type { AV, MomentData } from '../../../types';
import type { BaseMomentProps } from '../BaseMoment/BaseMoment.types';

export type AVBaseMomentProps<T=MomentData> = BaseMomentProps<T> & {
  av: AV;
};

export type AVBaseMomentPropsWithoutChildren<T=MomentData> = Omit<
AVBaseMomentProps<T>,
'children'
>;
