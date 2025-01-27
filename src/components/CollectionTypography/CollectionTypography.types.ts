import type { EditableCollectionKeys } from '../../state/collectionStore';
import type { BoundTypographyProps } from '../UI/BoundTypography/BoundTypography.types';

export type CollectionTypographyProps = Omit<BoundTypographyProps<EditableCollectionKeys>, 'store'>;
