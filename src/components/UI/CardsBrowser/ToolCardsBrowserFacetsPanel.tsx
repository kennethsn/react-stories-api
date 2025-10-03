import Grid from '@mui/material/Grid2';
import { observer } from 'mobx-react-lite';

import SearchFacets from '../SearchFacets/SearchFacets';
import styles from './CardsBrowser.styles';
import type { ToolCardsBrowserFacetsPanelProps } from './CardsBrowser.types';

const ToolCardsBrowserFacetsPanel = observer(({ search }: ToolCardsBrowserFacetsPanelProps) => (
  <Grid
    container
    sx={styles.toolFacetsPanelRoot}
  >
    <Grid size={12}>
      <SearchFacets search={search} />
    </Grid>
  </Grid>
));

export default ToolCardsBrowserFacetsPanel;
