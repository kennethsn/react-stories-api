import { observer } from 'mobx-react-lite';

import { useCollection } from '../../hooks';
import BoundActions from '../UI/BoundActions/BoundActions';
import styles from './CollectionActions.styles';

// TODO: Allow prop slot for custom actions to use in workspace (add story)
const CollectionActions = observer(() => {
  const collection = useCollection();

  return (
    <BoundActions
      store={collection}
      sx={styles.root}
      type="Collection"
    />
  );
});

export default CollectionActions;
