import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const styles = {
  modalBox: styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    left: '50%',
    outline: 'none',
    padding: theme.spacing(4),
    position: 'absolute' as const,
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
  })),
};

export default styles;
