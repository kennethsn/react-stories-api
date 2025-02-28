import type { TextFieldProps } from '@mui/material';

export type SearchInputProps = Omit<TextFieldProps, 'onChange' | 'onSubmit' | 'value'> & {
  readonly onChange: (value: string) => void;
  readonly onSubmit: (value: string) => Promise<void>;
  readonly value: string;
};
