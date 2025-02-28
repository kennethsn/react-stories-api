import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import useCollection from '../../hooks/useCollection';
import CollectionSlot from '../CollectionSlot/CollectionSlot';
import SearchInput from '../UI/SearchInput/SearchInput';
import styles from './CollectionSearch.styles';
import CollectionSearchNoResults from './CollectionSearchNoResults';

const CollectionSearch = observer(() => {
  const collection = useCollection();

  const handleSearchChange = (searchInput: string) => {
    collection.setSearchInput(searchInput);
  };

  const handleSearchSubmit = async () => {
    await collection.options.onSearch?.(collection.searchInput, collection);
  };

  return (
    <Box sx={styles.root}>
      <SearchInput
        fullWidth
        onChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
        placeholder="Search collection.."
        sx={styles.input}
        value={collection.searchInput}
        variant="standard"
      />

      <CollectionSlot component="CollectionSearch" />

      <When condition={collection.shouldShowNoResultsMessage}>
        <CollectionSearchNoResults />
      </When>
    </Box>
  );
});

export default CollectionSearch;
