import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { lazy, Suspense, useEffect } from 'react';
import { Else, If, Then } from 'react-if';
import { useSearchParams } from 'react-router-dom';

import useCollections from '../../hooks/useCollections';
import CollectionProvider from '../../providers/CollectionProvider';
import type { CollectionStore } from '../../state';
import CollectionLoader from '../CollectionLoader/CollectionLoader';
import type { StoriesAPICollectionProps } from './StoriesAPICollection.types';
// TODO: API Task handling

const Collection = lazy(() => import('../Collection/Collection'));

// TODO: Project-wide Search
// TODO: Collection status pages
const StoriesAPICollection = observer(({
  connectRouter,
  onSearch,
  ...props
}: StoriesAPICollectionProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const collections = useCollections();
  let { collectionId, page, searchInput } = props;
  if (connectRouter) {
    const routeParams = collections.getCollectionRouteParams();
    collectionId = routeParams.collectionId;
    page = Number(searchParams.get('page')) || page;
    searchInput = searchParams.get('q') || searchInput;
  }
  if (!collectionId) {
    throw new Error('Collection not found.');
  }
  const collection = collections.getCollection(collectionId);

  const updateSearchParams = (collectionStore: CollectionStore) => {
    setSearchParams(
      { page: collectionStore.page.toString(), q: collectionStore.searchInput },
    );
  };

  const handleSearch = async (_: string, collectionStore: CollectionStore) => {
    await collectionStore.search();
    if (connectRouter) {
      updateSearchParams(collectionStore);
    }
  };

  const handlePageChange = async (pageNumber: number, collectionStore: CollectionStore) => {
    await collectionStore.changePage(pageNumber);
    if (connectRouter) {
      updateSearchParams(collectionStore);
    }
  };

  useEffect(() => autorun(() => {
    collections.loadCollection(
      collectionId,
      {
        ...props,
        onPageChange: handlePageChange,
        onSearch: handleSearch,
        page,
        searchInput,
      },
      (collectionStore) => {
        if (connectRouter) {
          collectionStore?.updatePageTitle();
        }
      },
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [collectionId, props.editable]);

  const loader = (
    <CollectionLoader isFullscreen />
  );

  return (
    <Suspense fallback={loader}>
      <If condition={!!collection}>
        <Then>
          <CollectionProvider
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            store={collection!}
          >
            {/* eslint-disable-next-line react/jsx-max-depth */}
            <Collection />
          </CollectionProvider>
        </Then>

        <Else>
          {loader}
        </Else>
      </If>
    </Suspense>
  );
});

export default StoriesAPICollection;
