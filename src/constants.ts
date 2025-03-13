export const COLLECTION_STORIES_DEFAULT_PAGE_SIZE = 24;
export const COLLECTION_SEARCH_MIN_THRESHOLD = 3;
export const COLOR_HEX_REGEX = /^#([0-9A-Fa-f]{3}){1,2}([0-9A-Fa-f]{2})?$/;
export const FORMATTER_TEMPLATE_REGEX = /\{(\w+)\}/g;
export const GRID_MAX_SIZE = 12;
export const HATHI_TRUST_BASE_URL = 'https://babel.hathitrust.org';
export const HATHI_TRUST_EMBED_URL = `${HATHI_TRUST_BASE_URL}/cgi/pt`;
// KSN TODO: Preserve this URL
export const HATHI_TRUST_LOGO_URL = 'https://www.hathitrust.org/wp-content/uploads/2023/02/cropped-favicon-192x192.png';
export const MOMENT_LAYOUT_DEFAULT_CONTENT_SIZE = 8;
export const MOMENT_LAYOUT_MAX_CONTENT_SIZE = GRID_MAX_SIZE;
export const STORY_ANIMATION_SPEED = 1500;
export const STORIES_SERVICES_BASE_URL = 'https://stories.k2.services';
export const STORIES_SERVICES_API_URL = `${STORIES_SERVICES_BASE_URL}/api`;
export const THEME_COLOR_OPTIONS = <const>[
  'error',
  'info',
  'primary',
  'secondary',
  'success',
  'warning',
];
export const TYPOGRAPHY_COLOR_OPTIONS = <const>{
  error: 'error.main',
  info: 'info.main',
  primary: 'primary.main',
  secondary: 'secondary.main',
  success: 'success.main',
  textDisabled: 'text.disabled',
  textPrimary: 'text.primary',
  textSecondary: 'text.secondary',
  warning: 'warning.main',
};
export const WIKIDATA_BASE_URL = 'https://m.wikidata.org';
export const WIKIDATA_LOGO_URL = 'https://upload.wikimedia.org/wikipedia/commons/6/66/Wikidata-logo-en.svg';
export const WIKIPEDIA_BASE_URL = 'https://m.wikipedia.org';
export const WIKIPEDIA_LOGO_URL = 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Wikipedia-logo-v2-en.svg';
export const YOUTUBE_BASE_URL = 'https://www.youtube.com';
export const YOUTUBE_EMBED_URL = `${YOUTUBE_BASE_URL}/embed`;
export const YOUTUBE_WATCH_URL = `${YOUTUBE_BASE_URL}/watch`;
