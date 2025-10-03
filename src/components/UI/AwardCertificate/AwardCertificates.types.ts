import type { SxProps, Theme } from '@mui/material/styles';

import AwardMomentStore from '../../../state/moments/awardMomentStore';
import { Award } from '../../../types';

export type AwardCertificateProps = {
  moment?: AwardMomentStore;
  readonly award: Award;
  readonly sx?: SxProps<Theme>;
};
