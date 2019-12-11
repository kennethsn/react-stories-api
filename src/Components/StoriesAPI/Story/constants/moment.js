import * as Moments from '../../../Moment';

export const API_TO_MOMENT_MAP = {
  'award': Moments.AwardMoment,
  'audio': Moments.AudioMoment,
  'education': Moments.EducationMoment,
  'employer': Moments.EmployerMoment,
  'iframe': Moments.IFrameMoment,
  'image': Moments.ImageMoment,
  // 'index': Moments.IndexMoment, // TODO: build this (#82)
  'library': Moments.LibraryMoment,
  'map': Moments.MapMoment,
  'membership': Moments.MembershipMoment,
  'mirador': Moments.MiradorMoment,
  'named_after': Moments.NamedAfterMoment,
  'pdf': Moments.PDFMoment,
  'people': Moments.PeopleMoment,
  'timeline': Moments.TimelineMoment,
  'wikidata': Moments.WikidataMoment,
  'wikipedia': Moments.WikipediaMoment,
  'youtube': Moments.YouTubeMoment,
};
