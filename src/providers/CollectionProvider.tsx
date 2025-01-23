import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { type PropsWithChildren, useEffect } from 'react';
import { When } from 'react-if';

import type { CollectionProps } from '../components/Collection/Collection.types';
import CollectionContext from '../contexts/CollectionContext';
import useCollections from '../hooks/useCollections';

type CollectionProviderProps = CollectionProps & PropsWithChildren;

const CollectionProvider = observer(({
  collection,
  children,
}: CollectionProviderProps) => {
  const collections = useCollections();
  useEffect(() => autorun(() => {
    collections.addCollection(collection);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [collection]);

  const collectionStore = collections.getCollection(collection.id);
  return (
    <When condition={!!collectionStore}>
      <CollectionContext.Provider value={collectionStore!}>
        {children}
      </CollectionContext.Provider>
    </When>
  );
});

export default CollectionProvider;
