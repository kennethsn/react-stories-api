import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { getFormattedArray } from '../../../utils/string';
import type { TemplatedTypographyProps } from './TemplatedTypography.types';

export default function TemplatedTypography({
  children,
  values,
  valueSx,
  ...props
}: TemplatedTypographyProps) {
  const formattedArray = getFormattedArray(children, values);
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Typography {...props}>
      {formattedArray.map((item, index) => (
        <Box
          key={index ?? item.value}
          className={`templated-typography-${item.key ?? 'default'}`}
          component="span"
          sx={item.replaced ? valueSx : undefined}
        >
          {item.value}
        </Box>
      ))}
    </Typography>
  );
}
