import Fade from '@mui/material/Fade';
import styled from '@mui/material/styles/styled';
import MuiTooltip from '@mui/material/Tooltip';

import styles from './Tooltip.styles';
import type { TooltipProps } from './Tooltip.types';

const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip
    enterDelay={500}
    slotProps={{
      transition: { timeout: 400 },
    }}
    slots={{
      transition: Fade,
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    classes={{ popper: className }}
  />
))(({ theme }) => (styles(theme)));

export default Tooltip;
