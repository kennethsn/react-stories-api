import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { lazy, Suspense, useEffect } from 'react';
import { Else, If, Then } from 'react-if';
import { useParams } from 'react-router-dom';

import { useCollections } from '../../hooks';
import { CollectionProvider } from '../../providers';
import type { StoriesAPICollectionProps } from './StoriesAPICollection.types';

// TODO: No Stories
// TODO: API Task handling
// TODO: Stories Loading
// TODO: Search
// TODO: Ability to mark favorites
// TODO: Edit image
// TODO: View Component that binds to route
// TODO: Collection loading

const Collection = lazy(() => import('../Collection/Collection'));

const StoriesAPICollection = observer(({
  connectRouter,
  ...props
}: StoriesAPICollectionProps) => {
  const routeParams = useParams<{ collectionId: string }>();
  const collections = useCollections();
  const collectionId = connectRouter ? Number(routeParams.collectionId) : props.collectionId!;
  useEffect(() => autorun(() => {
    collections.loadCollection(collectionId, props);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [collectionId, props.editable]);
  const collection = collections.getCollection(collectionId);
  return (
    <Suspense fallback={<div>{/* TODO: Loader & Error handling */}</div>}>
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
          {/* TODO: Loader & Error handling */}
        </Else>
      </If>
    </Suspense>
  );
});

export default StoriesAPICollection;
