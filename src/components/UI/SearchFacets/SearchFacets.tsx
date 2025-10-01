import Grid from '@mui/material/Grid2';
import { observer } from 'mobx-react-lite';

import styles from './SearchFacets.styles';
import type { SearchFacetsProps } from './SearchFacets.types';
import SearchFacetSelector from './SearchFacetSelector';

const SearchFacets = observer(({ search }: SearchFacetsProps) => (
  <Grid
    container
    direction="column"
    spacing={2}
    sx={styles.root}
  >
    {search?.facets?.map(({ key }) => (
      <Grid
        key={key}
        size={12}
      >
        <SearchFacetSelector
          search={search}
          searchFacetKey={key}
        />
      </Grid>
    ))}
  </Grid>
));

export default SearchFacets;
