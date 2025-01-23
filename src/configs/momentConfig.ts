import { HATHI_TRUST_LOGO_URL } from '../constants';
import HathiTrustMomentStore from '../state/moments/hathiTrustMomentStore';
import IFrameMomentStore from '../state/moments/iframeMomentStore';
import ImageMomentStore from '../state/moments/imageMomentStore';
import StoriesMomentStore from '../state/moments/storiesMomentStore';
import TimelineMomentStore from '../state/moments/timelineMomentStore';
import VideoMomentStore from '../state/moments/videoMomentStore';
import YouTubeMomentStore from '../state/moments/youTubeMomentStore';
import MomentsStore from '../state/momentsStore';
import MomentStore from '../state/momentStore';
import type { Icon, Moment, MomentType } from '../types';

// KSN TODO: Add Plugin framework to bind component as a caller
export type MomentConfig = {
  component: string;
  icon?: Icon;
  store: (moments: MomentsStore, moment: Moment<never>) => MomentStore;
};

export type IMomentConfigMap = Record<MomentType, MomentConfig>;

const MomentConfigMap: Record<MomentType, MomentConfig> = {
  hathiTrust: {
    component: 'HathiTrustMoment',
    icon: { name: 'HathiTrust', type: 'image', url: HATHI_TRUST_LOGO_URL },
    store: HathiTrustMomentStore.build,
  },
  iframe: {
    component: 'IFrameMoment',
    icon: { name: 'language', type: 'mui' },
    store: IFrameMomentStore.build,
  },
  image: {
    component: 'ImageMoment',
    icon: { name: 'image', type: 'mui' },
    store: ImageMomentStore.build,
  },
  stories: {
    component: 'StoriesMoment',
    icon: { name: 'collections_bookmark', type: 'mui' },
    store: StoriesMomentStore.build,
  },
  timeline: {
    component: 'TimelineMoment',
    icon: { name: 'event_note', type: 'mui' },
    store: TimelineMomentStore.build,
  },
  video: {
    component: 'VideoMoment',
    icon: { name: 'videocam', type: 'mui' },
    store: VideoMomentStore.build,
  },
  youTube: {
    component: 'YouTubeMoment',
    icon: { name: 'youtube_activity', type: 'mui' },
    store: YouTubeMomentStore.build,
  },
};

export default MomentConfigMap;
