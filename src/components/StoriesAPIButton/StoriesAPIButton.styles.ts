import { alpha } from '@mui/material/styles';

const styles = {
  root: (color: string) => ({
    '--variant-outlinedBg': alpha(color, 0.05),
  }),
};

export default styles;
