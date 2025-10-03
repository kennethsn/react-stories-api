import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox, { type CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { type SyntheticEvent, useMemo, useState } from 'react';
import { When } from 'react-if';

import { SEARCH_FACET_MAX_VISIBLE_VALUES } from '../../../constants';
import useLocale from '../../../hooks/useLocale';
import { formatNumberString } from '../../../utils';
import styles from './SearchFacets.styles';
import type { SearchFacetSelectorProps } from './SearchFacets.types';
import SearchFacetSelectorControls from './SearchFacetSelectorControls';

const SearchFacetSelector = observer(({
  search,
  searchFacetKey,
}: SearchFacetSelectorProps) => {
  const { t } = useLocale();
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [facetOptionsFilter, setFacetOptionsFilter] = useState('');
  const searchFacet = search.getFacet(searchFacetKey);
  const selectedValues = search.getSelectedFacetValues(searchFacetKey);
  const hasSelectedValue = selectedValues.length > 0;

  const valueRefs = searchFacet.value_refs;

  // Build options list
  const allOptions = useMemo(() => valueRefs.map((ref) => ({
    count: ref.count,
    formattedCount: formatNumberString(ref.count),
    label: ref.label ?? ref.value,
    value: ref.value,
  })), [valueRefs]);

  const shouldShowAutocomplete = allOptions.length > SEARCH_FACET_MAX_VISIBLE_VALUES;

  // Determine current filtered + visible options
  const filteredOptions = useMemo(() => {
    const term = facetOptionsFilter.trim().toLowerCase();
    return allOptions
      .filter(
        (opt) => opt.label.toLowerCase().includes(term)
          || opt.value.toLowerCase().includes(term),
      )
      .sort((a, b) => b.count - a.count); // Sort descending by count
  }, [allOptions, facetOptionsFilter]);

  // Ensure selected values are always shown first
  const checkboxOptions = useMemo(() => {
    const selectedSet = new Set(selectedValues);
    const selectedOpts = allOptions.filter((opt) => selectedSet.has(opt.value));
    const unselectedOpts = filteredOptions.filter(
      (opt) => !selectedSet.has(opt.value),
    );
    return [...selectedOpts, ...unselectedOpts].slice(0, SEARCH_FACET_MAX_VISIBLE_VALUES);
  }, [filteredOptions, selectedValues, allOptions]);

  const handleAutocompleteChange = (
    _: SyntheticEvent,
    selectedOption: string | { value: string },
  ) => {
    if (selectedOption) {
      const value = typeof selectedOption === 'string'
        ? selectedOption
        : selectedOption.value;
      handleSelectValue(value);
    }
  };

  const handleCheckboxChange = (value: string): CheckboxProps['onChange'] => (_, checked) => {
    if (checked) {
      handleSelectValue(value);
    } else {
      handleDeselectValue(value);
    }
  };
  const handleDeselectAll = () => {
    const allVisible = checkboxOptions.map((opt) => opt.value);
    allVisible.forEach((val) => handleDeselectValue(val));
  };

  const handleDeselectValue = (value: string) => {
    search.deselectFacetValue(searchFacet.key, value);
  };

  const handleSelectAll = () => {
    const allVisible = checkboxOptions.map((opt) => opt.value);
    allVisible.forEach((val) => handleSelectValue(val));
  };
  const handleSelectValue = (value: string) => {
    search.selectFacetValue(searchFacet.key, value);
  };

  return (
    <Box>
      <Typography
        sx={styles.facetLabel(hasSelectedValue)}
        variant="subtitle1"
      >
        {searchFacet.label ?? searchFacet.key}
      </Typography>

      <SearchFacetSelectorControls
        onDeselectAll={handleDeselectAll}
        onSelectAll={handleSelectAll}
        selectedCount={selectedValues?.length || 0}
      />

      <When condition={shouldShowAutocomplete}>
        {showAutocomplete ? (
          <Autocomplete
            autoHighlight
            disableClearable
            disableCloseOnSelect
            freeSolo
            inputValue={facetOptionsFilter}
            onBlur={() => {
              if (facetOptionsFilter.trim() === '') {
                setShowAutocomplete(false);
              }
            }}
            onChange={handleAutocompleteChange}
            onInputChange={(_, newInputValue, reason) => {
              if (reason === 'input') {
                setFacetOptionsFilter(newInputValue);
              }
            }}
            openOnFocus
            options={filteredOptions}
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                autoFocus
                placeholder={`Search ${searchFacet.label ?? searchFacet.key}`}
                size="small"
                sx={styles.facetSelectorAutocomplete}
                variant="outlined"
              />
            )}
          />
        ) : (

          <Button
            onClick={() => setShowAutocomplete(true)}
            sx={styles.facetSelectorSeeMoreButton}
            variant="text"
          >
            {t('see_more_options')}
          </Button>
        )}
      </When>

      <FormGroup>
        {checkboxOptions.map(({ formattedCount, value, label }) => {
          const selected = selectedValues.includes(value);
          const dimOthers = selectedValues.length > 0 && !selected;
          return (
            <FormControlLabel
              key={value}
              control={(
                <Checkbox
                  checked={selected}
                  onChange={handleCheckboxChange(value)}
                  size="small"
                />
              )}
              label={(
                <Typography
                  sx={styles.facetSelectorValueLabel(selected)}
                  variant="body2"
                >
                  {label}

                  <Typography
                    component="span"
                    sx={styles.facetSelectorValueCount}
                    variant="finePrint"
                  >
                    {`(${formattedCount})`}
                  </Typography>
                </Typography>
              )}
              sx={styles.facetSelectorValue(!dimOthers)}
            />
          );
        })}
      </FormGroup>
    </Box>
  );
});

export default SearchFacetSelector;
