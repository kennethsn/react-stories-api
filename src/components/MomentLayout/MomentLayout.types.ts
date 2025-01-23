import type { ReactNode } from 'react';

import type MomentStore from '../../state/momentStore';
import type { MomentBodyLayoutProps } from '../MomentBodyLayout/MomentBodyLayout.types';

export type MomentLayoutProps = MomentBodyLayoutProps & {
  readonly actions?: ReactNode;
  readonly moment: MomentStore;
};
