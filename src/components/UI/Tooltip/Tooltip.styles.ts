import type { Theme } from '@mui/material/styles';
import { tooltipClasses } from '@mui/material/Tooltip';

const styles = (theme: Theme) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    color: theme.palette.text.secondary,
    fontSize: 11,
    maxWidth: 150,
    p: 0.5,
  },
});

export default styles;
