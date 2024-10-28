import { buildVideoMomentFromYouTube } from '../../../utils/youTubeUtils';
import VideoMoment from '../VideoMoment/VideoMoment';
import type { YouTubeMomentProps } from './YouTubeMoment.types';

export default function YouTubeMoment({ moment }: YouTubeMomentProps) {
  const videoMoment = buildVideoMomentFromYouTube(moment);
  return (
    <VideoMoment moment={videoMoment} />
  );
}
