import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { type PropsWithChildren, useEffect } from 'react';
import { When } from 'react-if';

import type { CollectionProps } from '../components/Collection/Collection.types';
import CollectionContext from '../contexts/CollectionContext';
import useCollections from '../hooks/useCollections';
import type CollectionStore from '../state/collectionStore';
import type { AtLeastOne, Collection } from '../types';

type CollectionProviderProps = Omit<CollectionProps, 'collection'> & PropsWithChildren & AtLeastOne<{
  readonly collection?: Collection;
  readonly store?: CollectionStore;
}>;

const CollectionProvider = observer(({
  collection,
  children,
  editable,
  store,
  ...props
}: CollectionProviderProps) => {
  const collections = useCollections();
  useEffect(() => autorun(() => {
    if (store) return;
    collections.addCollection(collection!, { editable, source: 'local', ...props });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [collection]);

  const collectionStore = store ?? collections.getCollection(collection!.id);
  return (
    <When condition={!!collectionStore}>
      <CollectionContext.Provider value={collectionStore!}>
        {children}
      </CollectionContext.Provider>
    </When>
  );
});

export default CollectionProvider;
