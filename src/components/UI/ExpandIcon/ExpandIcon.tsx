import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Else, If, Then } from 'react-if';

import styles from './ExpandIcon.styles';
import type { ExpandIconProps } from './ExpandIcon.types';

export default function ExpandIcon({ expanded }: ExpandIconProps) {
  return (
    <If condition={expanded}>
      <Then>
        <ExpandMore sx={styles.root} />
      </Then>

      <Else>
        <ChevronRightIcon sx={styles.root} />
      </Else>
    </If>
  );
}
