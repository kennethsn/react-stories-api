import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { Case, Default, Switch } from 'react-if';

import SearchFacetDateRange from './SearchFacetDateRange';
import SearchFacetDateRangeYearSlider from './SearchFacetDateRangeYearSlider';
import SearchFacetLabel from './SearchFacetLabel';
import SearchFacetNumberInput from './SearchFacetNumberInput';
import SearchFacetNumberRange from './SearchFacetNumberRange';
import type { SearchFacetProps } from './SearchFacets.types';
import SearchFacetSelector from './SearchFacetSelector';

const SearchFacet = observer(({ search, searchFacetKey }: SearchFacetProps) => {
  const searchFacet = search.getFacet(searchFacetKey);
  const enrichedSearchFacet = search.getEnrichedFacet(searchFacetKey);
  const selectorType = search.getSelectorType(searchFacetKey);
  const hasValue = search.doesFacetHaveValue(searchFacetKey);
  const label = searchFacet.label ?? searchFacet.key;

  const handleClear = () => {
    search.deselectFacet(searchFacetKey);
  };

  return (
    <Box className="SearchFacet">
      <SearchFacetLabel
        description={searchFacet.description}
        hasValue={hasValue}
        label={label}
        onClear={handleClear}
      />

      <Switch>
        <Case condition={selectorType === 'number'}>
          <SearchFacetNumberInput
            search={search}
            searchFacet={searchFacet}
          />
        </Case>

        <Case condition={selectorType === 'number_range'}>
          <SearchFacetNumberRange
            search={search}
            searchFacet={searchFacet}
          />
        </Case>

        <Case condition={selectorType === 'year_range'}>
          <SearchFacetDateRangeYearSlider
            search={search}
            searchFacet={searchFacet}
          />
        </Case>

        <Case condition={selectorType === 'date_range'}>
          <SearchFacetDateRange
            search={search}
            searchFacet={searchFacet}
          />
        </Case>

        <Default>
          <SearchFacetSelector
            search={search}
            searchFacet={enrichedSearchFacet}
            searchFacetKey={searchFacetKey}
          />
        </Default>
      </Switch>
    </Box>
  );
});

export default SearchFacet;
