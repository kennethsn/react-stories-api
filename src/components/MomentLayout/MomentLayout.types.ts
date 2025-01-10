import type { ReactNode } from 'react';

import type { Moment } from '../../types';
import type { MomentBodyLayoutProps } from '../MomentBodyLayout/MomentBodyLayout.types';

export type MomentLayoutProps = MomentBodyLayoutProps & {
  readonly moment: Moment;
  readonly title?: ReactNode;
};
