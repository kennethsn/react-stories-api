import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import { observer } from 'mobx-react-lite';
import { type ChangeEvent, useEffect, useState } from 'react';

import {
  buildNumberRangeValueFromInputs,
  getNumberRangeInputValues,
} from '../../../utils/searchFacetUtils';
import styles from './SearchFacets.styles';
import type { SearchFacetNumberRangeProps } from './SearchFacets.types';

const SearchFacetNumberRange = observer(({
  search,
  searchFacet,
}: SearchFacetNumberRangeProps) => {
  const selectedValue = search.getSelectedFacetValue(searchFacet.key);
  const initialRange = getNumberRangeInputValues(selectedValue);

  const [minValue, setMinValue] = useState<string>(initialRange.minValue);
  const [maxValue, setMaxValue] = useState<string>(initialRange.maxValue);

  useEffect(() => {
    const rangeValue = getNumberRangeInputValues(selectedValue);
    setMinValue(rangeValue.minValue);
    setMaxValue(rangeValue.maxValue);
  }, [selectedValue]);

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMinValue(e.target.value);
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxValue(e.target.value);
  };

  const handleBlur = () => {
    search.setNumberRangeValue(
      searchFacet.key,
      buildNumberRangeValueFromInputs(minValue, maxValue),
    );
  };

  const { bounds } = searchFacet;

  return (
    <Grid
      container
      spacing={1}
    >
      <Grid size={6}>

        <TextField
          fullWidth
          onBlur={handleBlur}
          onChange={handleMinChange}
          placeholder="Min"
          size="small"
          slotProps={{
            htmlInput: {
              max: bounds?.max !== undefined && bounds?.max !== null ? bounds.max : undefined,
              min: bounds?.min !== undefined && bounds?.min !== null ? bounds.min : undefined,
            },
          }}
          sx={styles.facetNumberInput}
          type="number"
          value={minValue}
        />
      </Grid>

      <Grid size={6}>

        <TextField
          fullWidth
          onBlur={handleBlur}
          onChange={handleMaxChange}
          placeholder="Max"
          size="small"
          slotProps={{
            htmlInput: {
              max: bounds?.max !== undefined && bounds?.max !== null ? bounds.max : undefined,
              min: bounds?.min !== undefined && bounds?.min !== null ? bounds.min : undefined,
            },
          }}
          sx={styles.facetNumberInput}
          type="number"
          value={maxValue}
        />
      </Grid>
    </Grid>
  );
});

export default SearchFacetNumberRange;
