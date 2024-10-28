import type { FC } from 'react';

import HathiTrustMoment from '../components/Moments/HathiTrustMoment/HathiTrustMoment';
import IFrameMoment from '../components/Moments/IFrameMoment/IFrameMoment';
import ImageMoment from '../components/Moments/ImageMoment/ImageMoment';
import TimelineMoment from '../components/Moments/TimelineMoment/TimelineMoment';
import VideoMoment from '../components/Moments/VideoMoment/VideoMoment';
import YouTubeMoment from '../components/Moments/YouTubeMoment/YouTubeMoment';
import { HATHI_TRUST_LOGO_URL } from '../constants';
import type { Icon, Moment, MomentType } from '../types';

type MomentConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: FC<{ moment: Moment<any> }>;
  icon?: Icon;
};

// KSN TODO: Move the component import into moment router, then make this just a config
const MomentConfigMap: Record<MomentType, MomentConfig> = {
  hathiTrust: {
    component: HathiTrustMoment,
    icon: { name: 'HathiTrust', type: 'image', url: HATHI_TRUST_LOGO_URL },
  },
  iframe: {
    component: IFrameMoment,
    icon: { name: 'language', type: 'mui' },
  },
  image: {
    component: ImageMoment,
    icon: { name: 'image', type: 'mui' },
  },
  timeline: {
    component: TimelineMoment,
    icon: { name: 'event_note', type: 'mui' },
  },
  video: {
    component: VideoMoment,
    icon: { name: 'videocam', type: 'mui' },
  },
  youTube: {
    component: YouTubeMoment,
    icon: { name: 'youtube_activity', type: 'mui' },
  },
};

export default MomentConfigMap;
