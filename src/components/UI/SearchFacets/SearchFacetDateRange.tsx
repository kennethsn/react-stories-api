import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import { observer } from 'mobx-react-lite';
import { type ChangeEvent, useEffect, useState } from 'react';

import {
  buildDateRangeValueFromInputs,
  getDateRangeInputValues,
} from '../../../utils/searchFacetUtils';
import styles from './SearchFacets.styles';
import type { SearchFacetDateRangeProps } from './SearchFacets.types';

const SearchFacetDateRange = observer(({
  search,
  searchFacet,
}: SearchFacetDateRangeProps) => {
  const selectedValue = search.getSelectedFacetValue(searchFacet.key);
  const initialRange = getDateRangeInputValues(selectedValue);

  const [startValue, setStartValue] = useState<string>(initialRange.startValue);
  const [endValue, setEndValue] = useState<string>(initialRange.endValue);

  useEffect(() => {
    const rangeValue = getDateRangeInputValues(selectedValue);
    setStartValue(rangeValue.startValue);
    setEndValue(rangeValue.endValue);
  }, [selectedValue]);

  const handleStartChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartValue(e.target.value);
  };

  const handleEndChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEndValue(e.target.value);
  };

  const handleBlur = () => {
    search.setDateRangeValue(
      searchFacet.key,
      buildDateRangeValueFromInputs(startValue, endValue),
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
          onChange={handleStartChange}
          placeholder="Start date"
          size="small"
          slotProps={{
            htmlInput: {
              max: bounds?.max !== undefined && bounds?.max !== null ? bounds.max : undefined,
              min: bounds?.min !== undefined && bounds?.min !== null ? bounds.min : undefined,
            },
          }}
          sx={styles.facetDateInput}
          type="date"
          value={startValue}
        />
      </Grid>

      <Grid size={6}>

        <TextField
          fullWidth
          onBlur={handleBlur}
          onChange={handleEndChange}
          placeholder="End date"
          size="small"
          slotProps={{
            htmlInput: {
              max: bounds?.max !== undefined && bounds?.max !== null ? bounds.max : undefined,
              min: bounds?.min !== undefined && bounds?.min !== null ? bounds.min : undefined,
            },
          }}
          sx={styles.facetDateInput}
          type="date"
          value={endValue}
        />
      </Grid>
    </Grid>
  );
});

export default SearchFacetDateRange;
