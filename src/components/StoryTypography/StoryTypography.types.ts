import type { EditableStoryKeys } from '../../state/storyStore';
import type { BoundTypographyProps } from '../UI/BoundTypography/BoundTypography.types';

export type StoryTypographyProps = Omit<BoundTypographyProps<EditableStoryKeys>, 'store'>;
