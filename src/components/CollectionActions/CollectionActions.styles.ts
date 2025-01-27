import type { Theme } from '@mui/material/styles';

const styles = {
  root: ({ spacing }: Theme) => ({
    position: 'absolute',
    top: spacing(4),
  }),
};

export default styles;
