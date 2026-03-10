import TextField from '@mui/material/TextField';
import { observer } from 'mobx-react-lite';
import { type ChangeEvent, useEffect, useState } from 'react';

import {
  getNumberInputValue,
  getSearchFacetLabel,
  parseNumberInputValue,
} from '../../../utils/searchFacetUtils';
import styles from './SearchFacets.styles';
import type { SearchFacetNumberInputProps } from './SearchFacets.types';

const SearchFacetNumberInput = observer(({
  search,
  searchFacet,
}: SearchFacetNumberInputProps) => {
  const selectedValue = search.getSelectedFacetValue(searchFacet.key);
  const [value, setValue] = useState<string>(getNumberInputValue(selectedValue));

  useEffect(() => {
    setValue(getNumberInputValue(selectedValue));
  }, [selectedValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const handleBlur = () => {
    const parsedValue = parseNumberInputValue(value);
    if (parsedValue !== undefined) {
      search.setNumberValue(searchFacet.key, parsedValue);
    }
  };

  const label = getSearchFacetLabel(searchFacet);

  return (
    <TextField
      fullWidth
      onBlur={handleBlur}
      onChange={handleChange}
      placeholder={`Enter ${label.toLowerCase()}`}
      size="small"
      sx={styles.facetNumberInput}
      type="number"
      value={value}
    />
  );
});

export default SearchFacetNumberInput;
