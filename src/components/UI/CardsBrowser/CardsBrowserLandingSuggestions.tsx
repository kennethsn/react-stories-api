import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { When } from 'react-if';

import type { SearchSuggestion } from '../../../types';
import getSuggestionKey from '../../../utils/searchSuggestionUtils';
import styles from './CardsBrowser.styles';
import type { CardsBrowserLandingSuggestionsProps } from './CardsBrowser.types';

export default function CardsBrowserLandingSuggestions({
  isSectionTransitioning,
  isTransitioning,
  onSuggestionClick,
  overlineText,
  showLandingOverline,
  showLandingTitle,
  suggestions,
  titleText,
  transitioningSuggestionKey,
}: CardsBrowserLandingSuggestionsProps) {
  return (
    <Box sx={styles.landingSuggestionsRoot(isSectionTransitioning)}>
      <When condition={showLandingOverline}>
        <Typography
          color="text.secondary"
          variant="overline"
        >
          {overlineText}
        </Typography>
      </When>

      <When condition={showLandingTitle}>
        <Typography
          sx={styles.searchSuggestionTitle}
          variant="h6"
        >
          {titleText}
        </Typography>
      </When>

      <Box sx={styles.landingSuggestionsContainer}>
        {suggestions.map((suggestion: SearchSuggestion) => {
          const suggestionKey = getSuggestionKey('landing', suggestion);
          const isSelected = transitioningSuggestionKey === suggestionKey;
          const isFaded = isTransitioning && !isSelected;
          return (
            <Chip
              key={suggestionKey}
              icon={<SearchIcon fontSize="small" />}
              label={suggestion.display_name}
              onClick={() => onSuggestionClick(suggestion)}
              size="small"
              sx={styles.landingSuggestionChip(
                isSelected,
                isFaded,
                isTransitioning,
              )}
              variant="outlined"
            />
          );
        })}
      </Box>
    </Box>
  );
}
