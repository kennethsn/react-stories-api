import type { TextFieldProps } from '@mui/material';
import type { TypographyProps } from '@mui/material/Typography';

export type EditableTypographyProps = Omit<TypographyProps, 'children' | 'onBlur'>
& Omit<TextFieldProps, 'children' | 'color' | 'onBlur' | 'variant'> & {
  readonly onBlur?: (value: string) => void;
  readonly onChange?: (value: string) => void;
  readonly richText?: boolean;
  // Supports overriding props when rendering the TextField
  // if both components share the same prop name
  readonly textFieldProps?: TextFieldProps;
  readonly value: string;
};
