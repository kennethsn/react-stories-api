import Grid from '@mui/material/Grid2';
import { observer } from 'mobx-react-lite';

import SearchFacet from './SearchFacet';
import styles from './SearchFacets.styles';
import type { SearchFacetsProps } from './SearchFacets.types';

const SearchFacets = observer(({ search }: SearchFacetsProps) => (
  <Grid
    container
    direction="column"
    spacing={2}
    sx={styles.root}
  >
    {search?.facets?.map(({ key }, index) => (
      <Grid
        key={key}
        size={12}
        sx={index < (search?.facets?.length ?? 0) - 1 ? styles.facetDivider : undefined}
      >
        <SearchFacet
          search={search}
          searchFacetKey={key}
        />
      </Grid>
    ))}
  </Grid>
));

export default SearchFacets;
