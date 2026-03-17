import Autocomplete from '@mui/material/Autocomplete';
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
import {
  buildCheckboxOptions,
  buildFacetOptions,
  shouldShowFacetAutocomplete,
  sortAndFilterFacetOptions,
} from '../../../utils/searchFacetUtils';
import { Tooltip } from '../Tooltip';
import styles from './SearchFacets.styles';
import type { SearchFacetSelectorProps } from './SearchFacets.types';
import SearchFacetSelectorControls from './SearchFacetSelectorControls';

const SearchFacetSelector = observer(({
  search,
  searchFacet: searchFacetProp,
  searchFacetKey,
}: SearchFacetSelectorProps) => {
  const { t } = useLocale();
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [facetOptionsFilter, setFacetOptionsFilter] = useState('');
  const searchFacet = searchFacetProp || search.getFacet(searchFacetKey);

  const selectedValues = search.getSelectedFacetValues(searchFacetKey);
  const valueRefs = searchFacet.value_refs;

  const allOptions = useMemo(
    () => buildFacetOptions(valueRefs, formatNumberString),
    [valueRefs],
  );
  const shouldShowAutocomplete = shouldShowFacetAutocomplete(
    allOptions.length,
    SEARCH_FACET_MAX_VISIBLE_VALUES,
  );
  const filteredOptions = useMemo(
    () => sortAndFilterFacetOptions(allOptions, facetOptionsFilter),
    [allOptions, facetOptionsFilter],
  );
  const checkboxOptions = useMemo(
    () => buildCheckboxOptions(
      allOptions,
      filteredOptions,
      selectedValues,
      SEARCH_FACET_MAX_VISIBLE_VALUES,
    ),
    [allOptions, filteredOptions, selectedValues],
  );

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
    <>
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
        {checkboxOptions.map(({
          description,
          formattedCount,
          label,
          value,
        }) => {
          const selected = selectedValues.includes(value);
          const dimOthers = selectedValues.length > 0 && !selected;

          const valueLabelNode = (
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
          );

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
              label={
                description ? (
                  <Tooltip title={description}>
                    {valueLabelNode}
                  </Tooltip>
                ) : (
                  valueLabelNode
                )
              }
              sx={styles.facetSelectorValue(!dimOthers)}
            />
          );
        })}
      </FormGroup>
    </>
  );
});

export default SearchFacetSelector;
