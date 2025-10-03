import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import SearchInput from '../SearchInput/SearchInput';
import styles from './CardsBrowser.styles';
import type { CardsBrowserSearchProps } from './CardsBrowser.types';
import CardsBrowserNoResultsCard from './CardsBrowserNoResultsCard';

const CardsBrowserSearch = observer(({ search, slots }: CardsBrowserSearchProps) => (
  <Box sx={styles.searchRoot}>
    <SearchInput
      fullWidth
      placeholder={search.placeholder}
      search={search}
      sx={styles.searchInput}
      variant="standard"
    />

    {slots?.AfterSearchInput || null}

    <When condition={search.shouldShowNoResultsMessage}>
      <CardsBrowserNoResultsCard />
    </When>
  </Box>
));

export default CardsBrowserSearch;
