import { Moments } from '../../';

export const API_TO_MOMENT_MAP = {
  'award': Moments.AwardMoment,
  'audio': Moments.AudioMoment,
  'education': Moments.EducationMoment,
  'employer': Moments.EmployerMoment,
  'iframe': Moments.IFrameMoment,
  'index': Moments.IndexMoment, // TODO: build this (#82)
  'library': Moments.LibraryMoment,
  'map': Moments.MapMoment,
  'membership': Moments.MembershipMoment, // TODO: build this (#81)
  'mirador': Moments.MiradorMoment,
  'named_after': Moments.NamedAfterMoment,
  'pdf': Moments.PDFMoment,
  'people': Moments.PeopleMoment,
  'timeline': Moments.TimelineMoment,
  'wikidata': Moments.WikidataMoment,
  'wikipedia': Moments.WikipediaMoment,
  'youtube': Moments.YouTubeMoment,
  // TODO: Move to iframe on server-side (#35)
  'commons_category_iiif': Moments.IFrameMoment,
}
