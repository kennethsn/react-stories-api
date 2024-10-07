import { getMomentComponent } from '../../utils/momentUtils';
import type { StoryMomentProps } from './StoryMoment.types';

export default function StoryMoment({ moment }: StoryMomentProps) {
  const MomentComponent = getMomentComponent(moment);
  return (
    <MomentComponent moment={moment} />
  );
}
