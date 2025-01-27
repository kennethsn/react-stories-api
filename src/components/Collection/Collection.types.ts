import type { PropsWithChildren } from 'react';

import type { CollectionStoreOptions } from '../../state/collectionStore';
import type { Collection } from '../../types';

export type CollectionProps = Omit<CollectionStoreOptions, 'collection'> & {
  readonly collection?: Collection;
};

export type CollectionWrapperProps = PropsWithChildren & CollectionProps;
