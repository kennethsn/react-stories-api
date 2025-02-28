import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { type TextFieldProps } from '@mui/material/TextField';
import { useState } from 'react';

import { isEnter } from '../../../utils/keyboard';
import ConditionalIconButton from '../ConditionalIconButton/ConditionalIconButton';
import { SearchInputProps } from './SearchInput.types';

export default function SearchInput({
  disabled,
  onChange,
  onSubmit,
  value,
  ...textFieldProps
}: SearchInputProps) {
  const [loading, setLoading] = useState(false);
  const submit = async () => {
    if (disabled) {
      return;
    }
    setLoading(true);
    try {
      await onSubmit(value);
    } catch (e) {
      setLoading(false);
      throw e;
    }
    setLoading(false);
  };

  const handleSubmitButtonClick = () => submit();

  const handleTextFieldChange: TextFieldProps['onChange'] = (e) => onChange(e.target.value);

  const handleTextFieldKeyDown: TextFieldProps['onKeyDown'] = (e) => {
    if (isEnter(e)) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <TextField
      disabled={loading}
      onChange={handleTextFieldChange}
      onKeyDown={handleTextFieldKeyDown}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="end">
              <ConditionalIconButton
                color="primary"
                condition={value.length > 0}
                disabled={disabled}
                falseIcon={<SearchIcon />}
                loading={loading}
                onClick={handleSubmitButtonClick}
                trueIcon={<ImageSearchIcon />}
              />
            </InputAdornment>
          ),
        },
      }}
      // sx={styles.input}
      value={value}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...textFieldProps}
    />
  );
}
