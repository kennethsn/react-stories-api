import type { Theme } from '@mui/material/styles';

import { deepMerge } from '../../../utils/object';
import type { ContainerBadgeProps } from './ContainerBadge.types';

const styles = {
  root: ({
    color = 'primary',
    direction = 'left',
    offset = 0,
    sx,
  }: ContainerBadgeProps) => ({ palette }: Theme) => (deepMerge({
    backgroundColor: palette[color].main,
    borderColor: palette[color].contrastText,
    borderStyle: 'solid',
    borderRadius: 1.5,
    borderWidth: 0,
    color: palette[color].contrastText,
    m: direction === 'left' ? -offset : offset,
    position: 'absolute',
    px: 1,
    right: direction === 'left' ? undefined : 0,
    textAlign: 'left',
    zIndex: 1,
  }, sx)),
  text: {
    fontWeight: 'bold',
    verticalAlign: 'middle',
  },
};

export default styles;
