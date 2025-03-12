import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { lazy, Suspense, useEffect } from 'react';
import { Else, If, Then } from 'react-if';

import useCollections from '../../hooks/useCollections';
import { StatusPage } from '../UI/StatusPage';
import type { StoriesAPICollectionsProps } from './StoriesAPICollections.types';

const Collections = lazy(() => import('../Collections/Collections'));

const StoriesAPICollections = observer(({
  collectionPathFormatter,
  enableAllCollections,
  featured,
  layout,
  projectId,
  statuses,
  sx,
}: StoriesAPICollectionsProps) => {
  const collections = useCollections();
  const options = {
    featured,
    projectId,
    statuses,
  };
  useEffect(() => autorun(() => {
    collections.loadCollections(options);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [options]);

  const loader = (
    <StatusPage
      isLoading
      message="Loading collections..."
    />
  );

  return (
    <Suspense fallback={loader}>
      <If condition={collections.isCollectionsListLoading(options)}>
        <Then>
          {loader}
        </Then>

        <Else>
          <Collections
            collectionPathFormatter={collectionPathFormatter}
            collections={collections.getCollectionsList(options)!}
            enableAllCollections={enableAllCollections}
            layout={layout}
            sx={sx}
          />
        </Else>
      </If>
    </Suspense>
  );
});

export default StoriesAPICollections;
