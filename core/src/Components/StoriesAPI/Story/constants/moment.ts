import Moments from '../../../Moment';

const API_TO_MOMENT_MAP = Object.freeze({
  award: Moments.AwardMoment,
  audio: Moments.AudioMoment,
  education: Moments.EducationMoment,
  employer: Moments.EmployerMoment,
  iframe: Moments.IFrameMoment,
  image: Moments.ImageMoment,
  library: Moments.LibraryMoment,
  map: Moments.MapMoment,
  membership: Moments.MembershipMoment,
  mirador: Moments.MiradorMoment,
  named_after: Moments.NamedAfterMoment,
  pdf: Moments.PDFMoment,
  people: Moments.PeopleMoment,
  reference: Moments.ReferenceMoment,
  software_heritage: Moments.SoftwareHeritageMoment,
  timeline: Moments.TimelineMoment,
  video: Moments.VideoMoment,
  wikidata: Moments.WikidataMoment,
  wikipedia: Moments.WikipediaMoment,
  youtube: Moments.YouTubeMoment,
});

export default API_TO_MOMENT_MAP;
