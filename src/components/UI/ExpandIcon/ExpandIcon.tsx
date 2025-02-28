import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMore from '@mui/icons-material/ExpandMore';

import ConditionalIconButton from '../ConditionalIconButton/ConditionalIconButton';
import styles from './ExpandIcon.styles';
import type { ExpandIconProps } from './ExpandIcon.types';

export default function ExpandIcon({ expanded, sx }: ExpandIconProps) {
  return (
    <ConditionalIconButton
      condition={expanded}
      falseIcon={<ChevronRightIcon sx={styles.root} />}
      sx={sx}
      trueIcon={<ExpandMore sx={styles.root} />}
    />
  );
}
