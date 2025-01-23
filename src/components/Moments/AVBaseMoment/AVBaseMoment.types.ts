import type AVBaseMomentStore from '../../../state/moments/avBaseMomentStore';
import type { BaseMomentProps } from '../BaseMoment/BaseMoment.types';

export type AVBaseMomentProps<T=AVBaseMomentStore> = BaseMomentProps<T>;

export type AVBaseMomentPropsWithoutChildren<T=AVBaseMomentStore> = Omit<
AVBaseMomentProps<T>,
'children'
>;
