import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { SearchSuggestion } from '../../../types';
import getSuggestionKey from '../../../utils/searchSuggestionUtils';
import styles from './CardsBrowser.styles';
import type { CardsBrowserInputSuggestionsProps } from './CardsBrowser.types';

export default function CardsBrowserInputSuggestions({
  activeSuggestionIndex,
  isSectionTransitioning,
  isTransitioning,
  onSuggestionClick,
  onSuggestionHover,
  suggestions,
  transitioningSuggestionKey,
}: CardsBrowserInputSuggestionsProps) {
  const handleMouseDown = (event: React.MouseEvent) => {
    // Prevent the input from losing focus when clicking on suggestions,
    // which allows for better keyboard navigation support.
    event.preventDefault();
  };
  return (
    <Box
      onMouseDown={handleMouseDown}
      sx={styles.searchSuggestionsOverlayPaper(isSectionTransitioning)}
    >
      <Box sx={styles.searchSuggestionsPaper}>
        <Stack sx={styles.searchSuggestionsStack}>
          {suggestions.map((suggestion: SearchSuggestion, index) => {
            const suggestionKey = getSuggestionKey('input', suggestion);
            const isSelected = transitioningSuggestionKey === suggestionKey;
            const isFaded = isTransitioning && !isSelected;

            return (
              <ButtonBase
                key={suggestionKey}
                onClick={() => onSuggestionClick(suggestion)}
                onMouseEnter={() => onSuggestionHover(index)}
                sx={styles.searchSuggestionOption(
                  index,
                  activeSuggestionIndex === index,
                  isSelected,
                  isFaded,
                  isTransitioning,
                )}
              >
                <Box sx={styles.searchSuggestionTitleWrap}>
                  <Typography sx={styles.searchSuggestionTitle}>
                    {suggestion.display_name}
                  </Typography>
                </Box>
              </ButtonBase>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
