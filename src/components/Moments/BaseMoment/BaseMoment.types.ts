import type { Moment, MomentData } from '../../../types';
import { MomentBodyLayoutProps } from '../../MomentBodyLayout/MomentBodyLayout.types';

export type BaseMomentProps<T=MomentData> = MomentBodyLayoutProps & {
  readonly moment: Moment<T>;
};

export type BaseMomentPropsWithoutChildren<T=MomentData> = Omit<BaseMomentProps<T>, 'children'>;
