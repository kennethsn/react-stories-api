import Grid from '@mui/material/Grid2';
import LinearProgress from '@mui/material/LinearProgress';
import Pagination, { type PaginationProps } from '@mui/material/Pagination';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { When } from 'react-if';

import styles from './CardsBrowser.styles';
import type { CardsBrowserProps } from './CardsBrowser.types';
import CardsBrowserLayout from './CardsBrowserLayout';
import CardsBrowserSearch from './CardsBrowserSearch';

const CardsBrowser = observer(({
  children,
  layout,
  pagination,
  search,
  slots,
}: CardsBrowserProps) => {
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const handlePageChange: PaginationProps['onChange'] = async (_, page) => {
    pagination?.changePage(page);
    cardsContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const showSearch = (search ? !search.disabled : false) && layout !== 'minimal';
  const isLoading = Boolean(search?.loading || pagination?.loading);

  return (
    <CardsBrowserLayout
      layout={layout}
      pagination={pagination}
      search={search}
    >
      <When condition={showSearch}>
        <Grid
          ref={showSearch ? cardsContainerRef : null}
          size={12}
          sx={styles.searchSectionContainer}
        >
          <CardsBrowserSearch
            isLoading={isLoading}
            search={search!}
            slots={{
              AfterSearchInput: slots?.CardsBrowserSearch,
            }}
          />
        </Grid>
      </When>

      <Grid
        size={12}
        sx={styles.cardsContainer(isLoading)}
      >
        <LinearProgress
          ref={!(showSearch) ? cardsContainerRef : null}
          sx={styles.loader(isLoading && !showSearch)}
        />

        {children}
      </Grid>

      <When condition={pagination?.shouldShow}>
        <Grid
          size={12}
          sx={styles.paginationContainer}
        >
          <Pagination
            count={pagination?.lastPage}
            onChange={handlePageChange}
            page={pagination?.selectedPage}
          />
        </Grid>
      </When>
    </CardsBrowserLayout>
  );
});

export default CardsBrowser;
