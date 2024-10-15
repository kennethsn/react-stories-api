import { alpha } from '@mui/material/styles';

const styles = {
  button: (color: string) => ({
    backgroundColor: alpha(color, 0.05),
    color,
    m: 1,
    mb: 2,
  }),
  contentCard: {
    background: 'background.paper',
    borderRadius: 2,
    boxShadow: 4,
  },
  description: {
    px: 2,
    pb: 1,
  },
  image: (maxHeight: number, objectPosition: string) => ({
    maxHeight,
    objectFit: 'cover',
    objectPosition,
    width: '100%',
  }),
  title: {
    lineHeight: 1.2,
    px: 2,
    py: 1,
  },
};

export default styles;
