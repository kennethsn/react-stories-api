import type MomentStore from '../../../state/momentStore';
import type { MomentLayoutProps } from '../../MomentLayout/MomentLayout.types';

export type BaseMomentProps<T=MomentStore> = MomentLayoutProps & {
  readonly moment: T;
};

export type BaseMomentPropsWithoutChildren<T=MomentStore> = Omit<BaseMomentProps<T>, 'children'>;
