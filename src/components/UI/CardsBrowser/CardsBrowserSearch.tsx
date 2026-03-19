import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import useCardsBrowserSearch from '../../../hooks/useCardsBrowserSearch';
import useLocale from '../../../hooks/useLocale';
import SearchInput from '../SearchInput/SearchInput';
import styles from './CardsBrowser.styles';
import type { CardsBrowserSearchProps } from './CardsBrowser.types';
import CardsBrowserInputSuggestions from './CardsBrowserInputSuggestions';
import CardsBrowserLandingSuggestions from './CardsBrowserLandingSuggestions';
import CardsBrowserNoResultsCard from './CardsBrowserNoResultsCard';

const CardsBrowserSearch = observer(({
  isLoading = false,
  search,
  slots,
}: CardsBrowserSearchProps) => {
  const { t } = useLocale();
  const {
    activeSuggestionIndex,
    handleSearchInputBlur,
    handleSearchInputFocus,
    handleSearchInputKeyDown,
    inputSuggestionsToRender,
    isTransitioningInputSuggestionItems,
    isTransitioningInputSuggestions,
    isTransitioningLandingSuggestionItems,
    isTransitioningLandingSuggestions,
    landingSuggestionsToRender,
    onInputSuggestionClick,
    onLandingSuggestionClick,
    setActiveSuggestionIndex,
    shouldShowInputSuggestions,
    shouldShowLandingSuggestions,
    transitioningSuggestionKey,
  } = useCardsBrowserSearch(search);

  const landingOverlineText = t('search.suggestions.landingOverline');
  const landingTitleText = t('search.suggestions.landingTitle');
  const showLandingOverline = !!landingOverlineText;
  const showLandingTitle = !!landingTitleText;

  return (
    <Box sx={styles.searchRoot}>
      <Box sx={styles.searchInputOverlayAnchor}>
        <SearchInput
          fullWidth
          onBlur={handleSearchInputBlur}
          onFocus={handleSearchInputFocus}
          onKeyDown={handleSearchInputKeyDown}
          placeholder={search.placeholder}
          search={search}
          sx={styles.searchInput}
          variant="standard"
        />

        <When condition={shouldShowInputSuggestions}>
          <CardsBrowserInputSuggestions
            activeSuggestionIndex={activeSuggestionIndex}
            isSectionTransitioning={isTransitioningInputSuggestions}
            isTransitioning={isTransitioningInputSuggestionItems}
            onSuggestionClick={onInputSuggestionClick}
            onSuggestionHover={setActiveSuggestionIndex}
            suggestions={inputSuggestionsToRender}
            transitioningSuggestionKey={transitioningSuggestionKey}
          />
        </When>
      </Box>

      <LinearProgress sx={styles.searchInlineLoader(isLoading)} />

      {slots?.AfterSearchInput || null}

      <When condition={shouldShowLandingSuggestions}>
        <CardsBrowserLandingSuggestions
          isSectionTransitioning={isTransitioningLandingSuggestions}
          isTransitioning={isTransitioningLandingSuggestionItems}
          onSuggestionClick={onLandingSuggestionClick}
          overlineText={landingOverlineText}
          showLandingOverline={showLandingOverline}
          showLandingTitle={showLandingTitle}
          suggestions={landingSuggestionsToRender}
          titleText={landingTitleText}
          transitioningSuggestionKey={transitioningSuggestionKey}
        />
      </When>

      <When condition={search.shouldShowNoResultsMessage}>
        <CardsBrowserNoResultsCard />
      </When>
    </Box>
  );
});

export default CardsBrowserSearch;
