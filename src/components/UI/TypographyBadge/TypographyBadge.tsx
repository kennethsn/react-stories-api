import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { When } from 'react-if';

import { classNames } from '../../../utils/dom';
import styles from './TypographyBadge.styles';
import type { TypographyBadgeProps } from './TypographyBadge.types';

export default function TypographyBadge(props: TypographyBadgeProps) {
  const { children, className, textSx } = props;
  return (
    <When condition={!!children}>
      <Box
        className={classNames('typography-badge', className)}
        sx={styles.root(props) as never}
      >
        <Typography
          sx={styles.text(textSx)}
          variant="overline"
        >
          {children}
        </Typography>
      </Box>
    </When>

  );
}
