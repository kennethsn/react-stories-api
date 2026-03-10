import type { Theme } from '@mui/material/styles';

import { deepMerge } from '../../../utils/object';
import type { TypographyBadgeProps } from './TypographyBadge.types';

const styles = {
  root: ({
    color = 'primary',
    sx,
  }: TypographyBadgeProps) => ({ palette }: Theme) => (deepMerge({
    backgroundColor: palette[color].main,
    borderColor: palette[color].contrastText,
    borderStyle: 'solid',
    borderRadius: 1.5,
    borderWidth: 0,
    color: palette[color].contrastText,
    fontSize: '60%',
    display: 'inline-block',
    px: 1,
    mx: 1,
    textAlign: 'left',
    verticalAlign: 'middle',
  }, sx)),
  text: (textSx: TypographyBadgeProps['textSx']) => (deepMerge({
    fontSize: 'inherit',
    fontWeight: 'bold',
  }, textSx)),
};

export default styles;
