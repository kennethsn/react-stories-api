import { Else, If, Then } from 'react-if';

import CollectionProvider from '../../providers/CollectionProvider';
import type { CollectionWrapperProps } from './Collection.types';

export default function CollectionWrapper({ children, collection }: CollectionWrapperProps) {
  return (
    <If condition={!!collection}>
      <Then>
        <CollectionProvider collection={collection}>
          {children}
        </CollectionProvider>
      </Then>

      <Else>
        {children}
      </Else>
    </If>
  );
}
