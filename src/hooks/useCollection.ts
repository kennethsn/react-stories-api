import { useContext } from 'react';

import CollectionContext, { type ICollectionContext } from '../contexts/CollectionContext';

export default function useCollection(): ICollectionContext {
  const context = useContext(CollectionContext);
  if (!context?.collection) {
    throw new Error(
      'Using Collection Hook outside of CollectionProvider or with uninitialized Collection',
    );
  }
  return context;
}
