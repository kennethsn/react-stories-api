import type { ReactNode } from 'react';

import type { Moment } from '../../types';

export type MomentHeaderProps = {
  readonly moment: Moment;
  readonly title?: ReactNode;
};
