export const STORIES_API_HOMEPAGE = 'http://stage.stories.k2.services';

export enum IconSource {
  FontAwesome = 'fa',
  Image = 'img',
}

export enum MomentLayout {
  Audio = 'audio',
  Base = 'base',
  GridList = 'gridlist',
  Employer = 'employer',
  IFrame = 'iframe',
  Image = 'image',
  Library = 'library',
  Map = 'map',
  MerryGoRound = 'merry_go_round',
  Mirador = 'mirador',
  Parallax = 'parallax',
  PDF = 'pdf',
  Reference = 'reference',
  SideBar = 'sidebar',
  SlideScroll = 'slide_scroll',
  Tile = 'tile',
  Timeline = 'timeline',
  Video = 'video',
}

export enum MomentType {
  Audio = 'audio',
  Award = 'award',
  Base = 'base',
  Education = 'education',
  Employer = 'employer',
  Gallery = 'gallery',
  GridList = 'gridlist',
  IFrame = 'iframe',
  Image = 'image',
  Library = 'library',
  Map = 'map',
  Membership = 'membership',
  MerryGoRound = 'merry_go_round',
  Mirador = 'mirador',
  NamedAfter = 'named_after',
  Parallax = 'parallax',
  PDF = 'pdf',
  People = 'people',
  Reference = 'reference',
  SideBar = 'sidebar',
  SlideScroll = 'slide_scroll',
  SoftwareHeritage = 'software_heritage',
  Tile = 'tile',
  Timeline = 'timeline',
  Video = 'video',
  Wikidata = 'wikidata',
  Wikipedia = 'wikipedia',
  YouTube = 'youtube',
}

export const MOMENT_BASE_DEFAULT_PROPS = Object.freeze({
  bodyClassName: '',
  color: {
    background: 'gray',
    text: 'white',
  },
  label: '',
  story: {},
  subtitle: '',
  title: '',
});
