import AutoAwesomeTwoToneIcon from '@mui/icons-material/AutoAwesomeTwoTone';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { When } from 'react-if';

import styles from './StatusPage.styles';
import type { StatusPageProps } from './StatusPage.types';

export default function StatusPage({
  children,
  iconComponent: Icon = AutoAwesomeTwoToneIcon,
  isFullscreen,
  isLoading,
  message,
}: StatusPageProps) {
  return (
    <Grid
      container
      spacing={2}
      sx={styles.root(isFullscreen)}
    >

      <Grid>
        <When condition={isFullscreen}>
          <Icon sx={styles.icon} />
        </When>

        <When condition={isLoading}>
          <CircularProgress
            color="primary"
            size={72}
            sx={styles.progress}
          />
        </When>

      </Grid>

      <When condition={!!message}>
        <Grid>
          <Typography
            color="primary"
            variant="subtitle1"
          >
            {message}
          </Typography>
        </Grid>
      </When>

      {children}
    </Grid>
  );
}
