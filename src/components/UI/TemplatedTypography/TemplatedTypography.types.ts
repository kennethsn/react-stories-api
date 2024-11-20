import type { SxProps } from '@mui/material/styles';
import type { TypographyProps } from '@mui/material/Typography';

export type TemplatedTypographyProps = TypographyProps & {
  readonly children: string;
  readonly values: Record<string, string>;
  readonly valueSx?: SxProps;
};
