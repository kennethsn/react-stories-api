import { Theme } from '@mui/material/styles';

const styles = {
  modalBoxRoot: (theme: Theme) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    left: '50%',
    outline: 'none',
    p: 4,
    position: 'absolute' as const,
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
  }),
};

export default styles;
