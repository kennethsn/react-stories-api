import type MomentStore from '../../../state/momentStore';
import type { MomentData } from '../../../types';
import type { MomentLayoutProps } from '../../MomentLayout/MomentLayout.types';

export type BaseMomentProps<T=MomentStore> = MomentLayoutProps & {
  readonly moment: T;
};

export type BaseMomentPropsWithoutChildren<T=MomentData> = Omit<BaseMomentProps<T>, 'children'>;
