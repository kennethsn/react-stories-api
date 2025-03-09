import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import styles from './ContainerBadge.styles';
import type { ContainerBadgeProps } from './ContainerBadge.types';

export default function ContainerBadge(props: ContainerBadgeProps) {
  const { children } = props;
  return (
    <Box
      className="container-badge"
      sx={styles.root(props) as never}
    >
      <Typography
        sx={styles.text}
        variant="overline"
      >
        {children}
      </Typography>
    </Box>
  );
}
