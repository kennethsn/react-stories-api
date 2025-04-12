import { observer } from 'mobx-react-lite';

import { useCollection } from '../../hooks';
import BoundTypography from '../UI/BoundTypography/BoundTypography';
import type { CollectionTypographyProps } from './CollectionTypography.types';

const CollectionTypography = observer(({ collection, ...props }: CollectionTypographyProps) => {
  const store = collection ?? useCollection();
  return (
    <BoundTypography
      store={store}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
});

export default CollectionTypography;
