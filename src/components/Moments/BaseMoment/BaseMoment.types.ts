import type { ReactNode } from 'react';

import type { Moment, MomentData } from '../../../types';

export type BaseMomentProps<T=MomentData> = {
  children?: ReactNode;
  moment: Moment<T>;
};

export type BaseMomentPropsWithouChildren<T=MomentData> = Omit<BaseMomentProps<T>, 'children'>;
