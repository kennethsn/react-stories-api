import { observer } from 'mobx-react-lite';

import CollectionLayout from '../CollectionLayout/CollectionLayout';
import CollectionStoriesList from '../CollectionStoriesList/CollectionStoriesList';
import type { CollectionProps } from './Collection.types';
import CollectionWrapper from './CollectionWrapper';

const Collection = observer((props: CollectionProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <CollectionWrapper {...props}>
    <CollectionLayout>
      <CollectionStoriesList />
    </CollectionLayout>
  </CollectionWrapper>
));

export default Collection;
