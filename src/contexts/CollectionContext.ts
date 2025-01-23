import { createContext } from 'react';

import type CollectionStore from '../state/collectionStore';

export type ICollectionContext = CollectionStore;

const CollectionContext = createContext<ICollectionContext | null>(null);

export default CollectionContext;
