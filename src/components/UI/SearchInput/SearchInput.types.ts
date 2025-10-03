import type { TextFieldProps } from '@mui/material/TextField';

import type SearchStore from '../../../state/searchStore';

export type SearchInputProps = Omit<TextFieldProps, 'onChange' | 'onSubmit' | 'value'> & {
  readonly search: SearchStore
};
