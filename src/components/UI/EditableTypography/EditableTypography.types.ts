import type { TextFieldProps } from '@mui/material/TextField';
import type { TypographyProps } from '@mui/material/Typography';

import type { SerializableRecord } from '../../../types';

export type EditableTypographyProps = Omit<TypographyProps, 'children' | 'onBlur'>
& Omit<TextFieldProps, 'children' | 'color' | 'onBlur' | 'variant'> & {
  readonly formatter?: SerializableRecord;
  readonly onBlur?: (value: string) => void;
  readonly onChange?: (value: string) => void;
  readonly richText?: boolean;
  // Supports overriding props when rendering the TextField
  // if both components share the same prop name
  readonly textFieldProps?: TextFieldProps;
  readonly value: string;
};
