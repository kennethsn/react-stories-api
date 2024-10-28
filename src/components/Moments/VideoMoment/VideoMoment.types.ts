import type { VideoMomentData } from '../../../types';
import type { AVBaseMomentPropsWithoutChildren } from '../AVBaseMoment/AVBaseMoment.types';

export type VideoMomentProps = Omit<AVBaseMomentPropsWithoutChildren<VideoMomentData>, 'av'>;
