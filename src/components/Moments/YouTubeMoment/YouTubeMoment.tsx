import { buildIFrameMomentFromYouTube } from '../../../utils/youTubeUtils';
import IFrameMoment from '../IFrameMoment/IFrameMoment';
import type { YouTubeMomentProps } from './YouTubeMoment.types';

// KSN TODO: Extend to support AVPlayerMoment
export default function YouTubeMoment({ moment }: YouTubeMomentProps) {
  const iframeMoment = buildIFrameMomentFromYouTube(moment);
  return (
    <IFrameMoment moment={iframeMoment} />
  );
}
