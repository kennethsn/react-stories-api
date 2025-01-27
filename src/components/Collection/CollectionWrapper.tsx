import { observer } from 'mobx-react-lite';
import { Else, If, Then } from 'react-if';

import CollectionProvider from '../../providers/CollectionProvider';
import type { CollectionWrapperProps } from './Collection.types';

const CollectionWrapper = observer(({ children, ...props }: CollectionWrapperProps) => (
  <If condition={!!props.collection}>
    <Then>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <CollectionProvider {...props}>
        {children}
      </CollectionProvider>
    </Then>

    <Else>
      {children}
    </Else>
  </If>
));

export default CollectionWrapper;
