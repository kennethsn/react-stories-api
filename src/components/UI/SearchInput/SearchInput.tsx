import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { type TextFieldProps } from '@mui/material/TextField';
import { observer } from 'mobx-react-lite';

import { isEnter } from '../../../utils/keyboard';
import ConditionalIconButton from '../ConditionalIconButton/ConditionalIconButton';
import { SearchInputProps } from './SearchInput.types';

const SearchInput = observer(({
  search,
  ...textFieldProps
}: SearchInputProps) => {
  const handleSubmitButtonClick = () => search.submit();

  const handleTextFieldChange: TextFieldProps['onChange'] = (e) => search.setQuery(e.target.value);

  const handleTextFieldKeyDown: TextFieldProps['onKeyDown'] = (e) => {
    if (isEnter(e)) {
      e.preventDefault();
      search.submit();
    }
  };

  return (
    <TextField
      disabled={search.disabled}
      onChange={handleTextFieldChange}
      onKeyDown={handleTextFieldKeyDown}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="end">
              <ConditionalIconButton
                color="primary"
                condition={search.shouldShowSearchIcon}
                disabled={search.disabled}
                falseIcon={<SearchIcon />}
                loading={search.loading}
                onClick={handleSubmitButtonClick}
                trueIcon={<ImageSearchIcon />}
              />
            </InputAdornment>
          ),
        },
      }}
      value={search.query}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...textFieldProps}
    />
  );
});

export default SearchInput;
