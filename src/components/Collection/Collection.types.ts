import type { PropsWithChildren } from 'react';

import type { Collection } from '../../types';

export type CollectionProps = {
  collection: Collection
};

export type CollectionWrapperProps = PropsWithChildren & CollectionProps;
