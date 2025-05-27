import { grey } from '@mui/material/colors';
import type { Theme } from '@mui/material/styles';

const styles = {
  captionContainer: (theme: Theme) => ({
    bgcolor: '#000000a1',
    borderTopLeftRadius: 16,
    bottom: 0,
    color: grey[300],
    maxHeight: '75vh',
    maxWidth: '25vw',
    overflowY: 'auto',
    p: 3,
    position: 'fixed',
    right: 0,

    [theme.breakpoints.down('md')]: {
      maxWidth: '90vw',
    },
  }),
};

export default styles;
