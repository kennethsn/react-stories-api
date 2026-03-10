import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import {
  buildYearRangeValue,
  getYearRangeBounds,
  getYearRangeSelection,
  getYearRangeValue,
  updateYearRangeFromInput,
} from '../../../utils/searchFacetUtils';
import { EditableTypography } from '../EditableTypography';
import styles from './SearchFacets.styles';
import type { SearchFacetDateRangeProps } from './SearchFacets.types';

const SearchFacetDateRangeYearSlider = observer(({
  search,
  searchFacet,
}: SearchFacetDateRangeProps) => {
  const selectedValue = search.getSelectedFacetValue(searchFacet.key);
  const { maxYear, minYear } = getYearRangeBounds(searchFacet.bounds);
  const [value, setValue] = useState<number[]>(
    getYearRangeValue(selectedValue, minYear, maxYear),
  );

  useEffect(() => {
    setValue(getYearRangeValue(selectedValue, minYear, maxYear));
  }, [selectedValue, minYear, maxYear]);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setValue(newValue);
    }
  };

  const handleChangeCommitted = (
    _event: Event | React.SyntheticEvent,
    newValue: number | number[],
  ) => {
    if (Array.isArray(newValue)) {
      search.setDateRangeValue(searchFacet.key, buildYearRangeValue(newValue));
    }
  };

  const handleStartYearEdit = (newValueStr: string) => {
    const updatedRange = updateYearRangeFromInput(newValueStr, value, minYear, maxYear, true);
    if (!updatedRange) return;
    setValue(updatedRange);
    search.setDateRangeValue(searchFacet.key, buildYearRangeValue(updatedRange));
  };

  const handleEndYearEdit = (newValueStr: string) => {
    const updatedRange = updateYearRangeFromInput(newValueStr, value, minYear, maxYear, false);
    if (!updatedRange) return;
    setValue(updatedRange);
    search.setDateRangeValue(searchFacet.key, buildYearRangeValue(updatedRange));
  };

  const hasSelection = getYearRangeSelection(selectedValue);

  return (
    <Box sx={styles.facetYearSliderContainer}>
      <Slider
        disableSwap
        max={maxYear}
        min={minYear}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        sx={styles.facetYearSlider(!!hasSelection)}
        value={value}
        valueLabelDisplay="auto"
        valueLabelFormat={(yearValue: number) => String(yearValue)}
      />

      <Box sx={styles.facetYearSliderLabels}>
        <EditableTypography
          color="text.secondary"
          multiline={false}
          onBlur={handleStartYearEdit}
          textFieldProps={{ type: 'number' }}
          value={String(value[0])}
          variant="caption"
        />

        <EditableTypography
          color="text.secondary"
          multiline={false}
          onBlur={handleEndYearEdit}
          textFieldProps={{ type: 'number' }}
          value={String(value[1])}
          variant="caption"
        />
      </Box>
    </Box>
  );
});

export default SearchFacetDateRangeYearSlider;
