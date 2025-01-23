import type { ReactNode } from 'react';

import type MomentStore from '../../state/momentStore';

export type MomentHeaderProps = {
  readonly actions?: ReactNode;
  readonly moment: MomentStore;
};
