import type { EditableStoryKey } from '../../types';
import type { BoundTypographyProps } from '../UI/BoundTypography/BoundTypography.types';

export type StoryTypographyProps = Omit<BoundTypographyProps<EditableStoryKey>, 'store'>;
