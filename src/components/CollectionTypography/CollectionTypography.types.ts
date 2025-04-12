import type CollectionStore from '../../state/collectionStore';
import type { EditableCollectionKey } from '../../types';
import type { BoundTypographyProps } from '../UI/BoundTypography/BoundTypography.types';

export type CollectionTypographyProps = Omit<BoundTypographyProps<EditableCollectionKey>, 'store'> & {
  readonly collection?: CollectionStore;
};
