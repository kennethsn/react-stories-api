import type VideoMomentStore from '../../../state/moments/videoMomentStore';
import type { AVBaseMomentPropsWithoutChildren } from '../AVBaseMoment/AVBaseMoment.types';

export type VideoMomentProps = Omit<AVBaseMomentPropsWithoutChildren<VideoMomentStore>, 'av'>;
