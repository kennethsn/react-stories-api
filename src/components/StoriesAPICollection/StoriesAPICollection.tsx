import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { lazy, Suspense, useEffect } from 'react';
import { Else, If, Then } from 'react-if';
import { useSearchParams } from 'react-router-dom';

import useCollections from '../../hooks/useCollections';
import CollectionProvider from '../../providers/CollectionProvider';
import type { CollectionStore } from '../../state';
import { deserializeSelectedSearchFacets } from '../../utils/searchFacetUtils';
import CollectionLoader from '../CollectionLoader/CollectionLoader';
import type { StoriesAPICollectionProps } from './StoriesAPICollection.types';
// TODO: API Task handling

const Collection = lazy(() => import('../Collection/Collection'));

// TODO: Project-wide Search
// TODO: Collection status pages
const StoriesAPICollection = observer(({
  cacheKey,
  connectRouter,
  onSearch,
  ...props
}: StoriesAPICollectionProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const collections = useCollections();
  let {
    collectionId,
    page,
    searchDefaultFacets,
    searchInput,
  } = props;

  if (connectRouter) {
    const routeParams = collections.getCollectionRouteParams();
    collectionId ||= routeParams.collectionId;
    page = Number(searchParams.get('page')) || page;
    const queryFromRoute = searchParams.get('q');
    if (queryFromRoute !== null) {
      searchInput = queryFromRoute;
    } else {
      searchInput = searchInput ?? props.searchDefaultQuery;
    }

    if (searchParams.has('facets')) {
      searchDefaultFacets = deserializeSelectedSearchFacets(searchParams.get('facets'));
    }
  }
  if (!collectionId) {
    throw new Error('Collection not found.');
  }
  const collection = collections.getCollection(collectionId, cacheKey);

  const updateSearchParams = (collectionStore: CollectionStore) => {
    const queryParams = collectionStore.getQueryParams();
    setSearchParams(queryParams);
  };

  const handleSearch = async (_: string, collectionStore: CollectionStore) => {
    if (connectRouter) {
      updateSearchParams(collectionStore);
    }
  };

  const handlePageChange = async (_: number, collectionStore: CollectionStore) => {
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
        searchDefaultFacets,
        searchDefaultQuery: props.searchDefaultQuery,
        searchInput,
      },
      (collectionStore) => {
        if (connectRouter) {
          collectionStore?.updatePageTitle();
        }
      },
      cacheKey,
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [collectionId, props.editable]);

  const loader = (
    <CollectionLoader isFullscreen />
  );

  return (
    <Suspense fallback={loader}>
      <If condition={collection?.initialized}>
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
