import BaseMoment from '../components/Moments/BaseMoment/BaseMoment';
import HathiTrustMoment from '../components/Moments/HathiTrustMoment/HathiTrustMoment';
import IFrameMoment from '../components/Moments/IFrameMoment/IFrameMoment';
import ImageMoment from '../components/Moments/ImageMoment/ImageMoment';
import TimelineMoment from '../components/Moments/TimelineMoment/TimelineMoment';
import YouTubeMoment from '../components/Moments/YouTubeMoment/YouTubeMoment';
import { HATHI_TRUST_LOGO_URL } from '../constants';
import type { Icon, MomentType } from '../types';

type MomentConfig = {
  component: typeof BaseMoment;
  icon?: Icon;
};

// KSN TODO: Move the component import into moment router, then make this just a config
const MomentConfigMap: Record<MomentType, MomentConfig> = {
  base: {
    component: BaseMoment,
  },
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
  youTube: {
    component: YouTubeMoment,
    icon: { name: 'youtube_activity', type: 'mui' },
  },
};

export default MomentConfigMap;
