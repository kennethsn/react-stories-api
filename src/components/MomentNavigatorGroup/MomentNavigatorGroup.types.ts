import type MomentStore from '../../state/momentStore';
import type { MomentGroupWithMoments } from '../../types';

export type MomentNavigatorGroupProps = {
  readonly momentGroup: MomentGroupWithMoments<MomentStore>;
};
