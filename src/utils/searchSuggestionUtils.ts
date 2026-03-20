import type { SearchSuggestion } from '../types';

export default function getSuggestionKey(
  prefix: 'input' | 'landing',
  suggestion: SearchSuggestion,
) {
  return `${prefix}-${suggestion.display_name}-${suggestion.query ?? suggestion.display_name}`;
}
