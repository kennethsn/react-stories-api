import type { SxProps, Theme } from '@mui/material/styles';

import AwardsMomentStore from '../../../state/moments/awardsMomentStore';
import { Award } from '../../../types';

export type AwardCertificateProps = {
  moment?: AwardsMomentStore;
  readonly award: Award;
  readonly sx?: SxProps<Theme>;
};
