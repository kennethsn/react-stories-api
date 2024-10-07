import Box from '@mui/material/Box';
import MUIIcon from '@mui/material/Icon';

import type { MuiIcon } from '../../../types';
import { isNoIcon } from '../../../utils/iconUtils';
import { deepMerge } from '../../../utils/object';
import styles from './Icon.styles';
import type { IconProps } from './Icon.types';

// KSN TODO: add image type
export default function Icon({ icon, sx }: IconProps) {
  if (isNoIcon(icon)) {
    return null;
  }
  const boxSx = sx ? deepMerge(styles.root, sx) : styles.root;
  return (
    <Box sx={boxSx}>
      <MUIIcon
        baseClassName="material-symbols-sharp"
        sx={styles.muiIcon}
      >
        {(icon as MuiIcon).name}
      </MUIIcon>
    </Box>
  );
}
