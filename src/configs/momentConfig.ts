import { HATHI_TRUST_LOGO_URL, WIKIDATA_LOGO_URL, WIKIPEDIA_LOGO_URL } from '../constants';
import AwardMomentStore from '../state/moments/awardMomentStore';
import GalleryMomentStore from '../state/moments/galleryMomentStore';
import HathiTrustMomentStore from '../state/moments/hathiTrustMomentStore';
import HTMLMomentStore from '../state/moments/htmlMomentStore';
import IFrameMomentStore from '../state/moments/iframeMomentStore';
import ImageMomentStore from '../state/moments/imageMomentStore';
import LibraryMomentStore from '../state/moments/libraryMomentStore';
import MarkdownMomentStore from '../state/moments/markdownMomentStore';
import PDFMomentStore from '../state/moments/pdfMomentStore';
import StoriesMomentStore from '../state/moments/storiesMomentStore';
import TextMomentStore from '../state/moments/textMomentStore';
import TimelineMomentStore from '../state/moments/timelineMomentStore';
import VideoMomentStore from '../state/moments/videoMomentStore';
import WikidataMomentStore from '../state/moments/wikidataMomentStore';
import WikipediaMomentStore from '../state/moments/wikipediaMomentStore';
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
  award: {
    component: 'AwardMoment',
    icon: { name: 'trophy', type: 'mui' },
    store: AwardMomentStore.build,
  },
  gallery: {
    component: 'GalleryMoment',
    icon: { name: 'gallery_thumbnail', type: 'mui' },
    store: GalleryMomentStore.build,
  },
  hathiTrust: {
    component: 'HathiTrustMoment',
    icon: { name: 'HathiTrust', type: 'image', url: HATHI_TRUST_LOGO_URL },
    store: HathiTrustMomentStore.build,
  },
  html: {
    component: 'HTMLMoment',
    icon: { name: 'code', type: 'mui' },
    store: HTMLMomentStore.build,
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
  library: {
    component: 'LibraryMoment',
    icon: { name: 'library', type: 'mui' },
    store: LibraryMomentStore.build,
  },
  markdown: {
    component: 'MarkdownMoment',
    icon: { name: 'markdown', type: 'mui' },
    store: MarkdownMomentStore.build,
  },
  pdf: {
    component: 'PDFMoment',
    icon: { name: 'picture_as_pdf', type: 'mui' },
    store: PDFMomentStore.build,
  },
  stories: {
    component: 'StoriesMoment',
    icon: { name: 'collections_bookmark', type: 'mui' },
    store: StoriesMomentStore.build,
  },
  text: {
    component: 'TextMoment',
    icon: { name: 'text_snippet', type: 'mui' },
    store: TextMomentStore.build,
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
  wikidata: {
    component: 'WikidataMoment',
    icon: { name: 'wikidata', type: 'image', url: WIKIDATA_LOGO_URL },
    store: WikidataMomentStore.build,
  },
  wikipedia: {
    component: 'WikipediaMoment',
    icon: { name: 'wikipedia', type: 'image', url: WIKIPEDIA_LOGO_URL },
    store: WikipediaMomentStore.build,
  },
  youTube: {
    component: 'YouTubeMoment',
    icon: { name: 'youtube_activity', type: 'mui' },
    store: YouTubeMomentStore.build,
  },
};

export default MomentConfigMap;
