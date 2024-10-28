import type { ReactNode } from 'react';

import type { Moment, MomentData } from '../../../types';
import type { MomentBodyLayoutProps } from '../../MomentBodyLayout/MomentBodyLayout.types';

export type BaseMomentProps<T=MomentData> = MomentBodyLayoutProps & {
  readonly moment: Moment<T>;
  readonly title?: ReactNode;
};

export type BaseMomentPropsWithoutChildren<T=MomentData> = Omit<BaseMomentProps<T>, 'children'>;
