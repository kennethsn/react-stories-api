import type { Moment, MomentData } from '../../../types';
import type { MomentLayoutProps } from '../../MomentLayout/MomentLayout.types';

export type BaseMomentProps<T=MomentData> = MomentLayoutProps & {
  readonly moment: Moment<T>;
};

export type BaseMomentPropsWithoutChildren<T=MomentData> = Omit<BaseMomentProps<T>, 'children'>;
