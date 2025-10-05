import { observer } from 'mobx-react-lite';

import { useCollection } from '../../hooks';
import CollectionSlot from '../CollectionSlot/CollectionSlot';
import BoundActions from '../UI/BoundActions/BoundActions';
import styles from './CollectionActions.styles';

const CollectionActions = observer(() => {
  const collection = useCollection();

  return (
    <BoundActions
      prepend={(
        <CollectionSlot component="CollectionActions" />
      )}
      store={collection}
      sx={styles.root}
      type="collection"
    />
  );
});

export default CollectionActions;
