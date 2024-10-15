import { alpha } from '@mui/material/styles';

const styles = {
  dot: (color: string) => ({
    alignItems: 'center',
    backgroundColor: alpha(color, 0.1),
    borderColor: color,
    display: 'flex',
    height: '3rem',
    justifyContent: 'center',
    width: '3rem',
  }),
  icon: {
    color: 'primary.main',
    display: 'flex',
    fontSize: '2rem',
  },
};

export default styles;
