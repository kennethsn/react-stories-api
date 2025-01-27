import { observer } from 'mobx-react-lite';

import { useCollection } from '../../hooks';
import BoundTypography from '../UI/BoundTypography/BoundTypography';
import type { CollectionTypographyProps } from './CollectionTypography.types';

const CollectionTypography = observer(({ ...props }: CollectionTypographyProps) => {
  const collection = useCollection();
  return (
    <BoundTypography
      store={collection}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
});

export default CollectionTypography;
