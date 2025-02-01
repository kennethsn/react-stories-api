import type MomentStore from '../../state/momentStore';
import type { BoundTypographyProps } from '../UI/BoundTypography/BoundTypography.types';

export type StoryMomentProps = {
  readonly moment: MomentStore;
};

export type StoryMomentTypographyProps = Omit<BoundTypographyProps<string>, 'store'> & {
  readonly moment: MomentStore;
};
