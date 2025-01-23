import type { SxProps } from '@mui/material/styles';

import type AVBaseMomentStore from '../../state/moments/avBaseMomentStore';

export type MomentAVPlayPauseButtonProps = {
  readonly moment: AVBaseMomentStore;
  readonly sx?: SxProps
};
