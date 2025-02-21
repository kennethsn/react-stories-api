import type { EditableCollectionKeys } from '../../types';
import type { BoundTypographyProps } from '../UI/BoundTypography/BoundTypography.types';

export type CollectionTypographyProps = Omit<BoundTypographyProps<EditableCollectionKeys>, 'store'>;
