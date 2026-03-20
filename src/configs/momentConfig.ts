import { HATHI_TRUST_LOGO_URL, WIKIDATA_LOGO_URL, WIKIPEDIA_LOGO_URL } from '../constants';
import AwardsMomentStore from '../state/moments/awardsMomentStore';
import CardsContentMomentStore from '../state/moments/cardsContentMomentStore';
import GalleryMomentStore from '../state/moments/galleryMomentStore';
import GeoMomentStore from '../state/moments/geoMapMomentStore';
import HathiTrustMomentStore from '../state/moments/hathiTrustMomentStore';
import HTMLMomentStore from '../state/moments/htmlMomentStore';
import IdBadgesMomentStore from '../state/moments/idBadgesMomentStore';
import IFrameMomentStore from '../state/moments/iframeMomentStore';
import ImageMomentStore from '../state/moments/imageMomentStore';
import LibraryMomentStore from '../state/moments/libraryMomentStore';
import MarkdownMomentStore from '../state/moments/markdownMomentStore';
import MiradorMomentStore from '../state/moments/miradorMomentStore';
import PDFMomentStore from '../state/moments/pdfMomentStore';
import StatsMomentStore from '../state/moments/statsMomentStore';
import StoriesMomentStore from '../state/moments/storiesMomentStore';
import TextMomentStore from '../state/moments/textMomentStore';
import TimelineMomentStore from '../state/moments/timelineMomentStore';
import VideoMomentStore from '../state/moments/videoMomentStore';
import WikidataMomentStore from '../state/moments/wikidataMomentStore';
import WikipediaMomentStore from '../state/moments/wikipediaMomentStore';
import YouTubeMomentStore from '../state/moments/youTubeMomentStore';
import type { MomentConfigMap as IMomentConfigMap } from '../types';

const MomentConfigMap: IMomentConfigMap = {
  awards: {
    component: 'AwardsMoment',
    icon: { name: 'trophy', type: 'mui' },
    store: AwardsMomentStore.build,
  },
  cardsContent: {
    component: 'CardsContentMoment',
    icon: { name: 'dashboard', type: 'mui' },
    store: CardsContentMomentStore.build,
  },
  gallery: {
    component: 'GalleryMoment',
    icon: { name: 'gallery_thumbnail', type: 'mui' },
    store: GalleryMomentStore.build,
  },
  geoMap: {
    component: 'GeoMapMoment',
    icon: { name: 'globe', type: 'mui' },
    store: GeoMomentStore.build,
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
  idBadges: {
    component: 'IdBadgesMoment',
    icon: { name: 'badge', type: 'mui' },
    store: IdBadgesMomentStore.build,
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
    icon: { name: 'newsstand', type: 'mui' },
    store: LibraryMomentStore.build,
  },
  markdown: {
    component: 'MarkdownMoment',
    icon: { name: 'markdown', type: 'mui' },
    store: MarkdownMomentStore.build,
  },
  mirador: {
    component: 'MiradorMoment',
    icon: { name: 'photo_frame', type: 'mui' },
    store: MiradorMomentStore.build,
  },
  pdf: {
    component: 'PDFMoment',
    icon: { name: 'picture_as_pdf', type: 'mui' },
    store: PDFMomentStore.build,
  },
  stats: {
    component: 'StatsMoment',
    icon: { name: 'bar_chart', type: 'mui' },
    store: StatsMomentStore.build,
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
