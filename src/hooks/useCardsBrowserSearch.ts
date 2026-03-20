import type { KeyboardEvent } from 'react';
import { useEffect, useState } from 'react';

import type SearchStore from '../state/searchStore';
import type { SearchSuggestion } from '../types';
import getSuggestionKey from '../utils/searchSuggestionUtils';

const ITEM_FADE_DELAY_MS = 500;
const SECTION_FADE_DELAY_MS = 800;

type SuggestionLocation = 'input' | 'landing';
type SuggestionTransitionPhase = 'itemFade' | 'searchWait' | 'sectionFade' | null;
type NullableSuggestionLocation = SuggestionLocation | null;

export type UseCardsBrowserSearch = {
  readonly activeSuggestionIndex: number;
  readonly handleSearchInputBlur: () => void;
  readonly handleSearchInputFocus: () => void;
  readonly handleSearchInputKeyDown: (
    event: KeyboardEvent<HTMLDivElement>,
  ) => void | Promise<void>;
  readonly inputSuggestionsToRender: SearchSuggestion[];
  readonly isTransitioningInputSuggestionItems: boolean;
  readonly isTransitioningInputSuggestions: boolean;
  readonly isTransitioningLandingSuggestionItems: boolean;
  readonly isTransitioningLandingSuggestions: boolean;
  readonly landingSuggestionsToRender: SearchSuggestion[];
  readonly onInputSuggestionClick: (suggestion: SearchSuggestion) => void | Promise<void>;
  readonly onLandingSuggestionClick: (suggestion: SearchSuggestion) => void | Promise<void>;
  readonly setActiveSuggestionIndex: (index: number) => void;
  readonly shouldShowInputSuggestions: boolean;
  readonly shouldShowLandingSuggestions: boolean;
  readonly transitioningSuggestionKey: string | null;
};

const delay = (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

export default function useCardsBrowserSearch(search: SearchStore): UseCardsBrowserSearch {
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [transitioningSuggestionKey, setTransitioningSuggestionKey] = useState<string | null>(null);
  const [transitioningSuggestionLocation, setTransitioningSuggestionLocation] = useState<
  NullableSuggestionLocation
  >(null);
  const [transitionPhase, setTransitionPhase] = useState<SuggestionTransitionPhase>(null);
  const [transitionLandingSuggestions, setTransitionLandingSuggestions] = useState<
    typeof search.landingSuggestions
  >([]);

  const isTransitioningSuggestion = transitioningSuggestionKey !== null;

  const applySuggestionWithTransition = async (
    suggestion: SearchSuggestion,
    location: SuggestionLocation,
  ) => {
    if (isTransitioningSuggestion) {
      return;
    }

    const key = getSuggestionKey(location, suggestion);
    setTransitioningSuggestionLocation(location);
    setTransitioningSuggestionKey(key);

    if (location === 'input') {
      // Close the input menu immediately once a selection is made.
      search.setFocused(false);
      setActiveSuggestionIndex(-1);
    }

    if (location === 'landing') {
      setTransitionLandingSuggestions([...search.landingSuggestions]);
    }

    setTransitionPhase('itemFade');
    await delay(ITEM_FADE_DELAY_MS);

    // Phase 2: search fires, loader appears while section stays visible.
    setTransitionPhase('searchWait');

    try {
      await search.applySuggestion(suggestion);

      // Phase 3: search is done; section fades out before results render.
      setTransitionPhase('sectionFade');
      await delay(SECTION_FADE_DELAY_MS);
    } finally {
      setTransitionPhase(null);
      setTransitioningSuggestionLocation(null);
      setTransitioningSuggestionKey(null);
      setTransitionLandingSuggestions([]);
    }
  };

  useEffect(() => {
    setActiveSuggestionIndex(-1);
  }, [search.inputSuggestions.length, search.query]);

  const handleSearchInputKeyDown = async (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === 'ArrowDown') {
      if (!search.shouldShowInputSuggestions) return;
      event.preventDefault();
      setActiveSuggestionIndex((currentIndex) => {
        const nextIndex = currentIndex + 1;
        return nextIndex >= search.inputSuggestions.length ? 0 : nextIndex;
      });
      return;
    }

    if (event.key === 'ArrowUp') {
      if (!search.shouldShowInputSuggestions) return;
      event.preventDefault();
      setActiveSuggestionIndex((currentIndex) => {
        if (currentIndex <= 0) {
          return search.inputSuggestions.length - 1;
        }
        return currentIndex - 1;
      });
      return;
    }

    if (event.key === 'Escape') {
      setActiveSuggestionIndex(-1);
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const selectedSuggestion = activeSuggestionIndex >= 0
        ? search.inputSuggestions[activeSuggestionIndex]
        : undefined;
      if (selectedSuggestion) {
        await applySuggestionWithTransition(selectedSuggestion, 'input');
      } else {
        await search.submit();
      }
    }
  };

  const handleSearchInputFocus = () => {
    search.setFocused(true);
  };

  const handleSearchInputBlur = () => {
    search.setFocused(false);
  };

  const landingSuggestionsToRender = transitioningSuggestionLocation === 'landing'
    ? transitionLandingSuggestions
    : search.landingSuggestions;

  const shouldShowLandingSuggestions = search.shouldShowLandingSuggestions
    || (transitioningSuggestionLocation === 'landing' && landingSuggestionsToRender.length > 0);

  return {
    activeSuggestionIndex,
    handleSearchInputBlur,
    handleSearchInputFocus,
    handleSearchInputKeyDown,
    inputSuggestionsToRender: search.inputSuggestions,
    isTransitioningInputSuggestionItems: (
      transitioningSuggestionLocation === 'input' && transitionPhase !== null
    ),
    isTransitioningInputSuggestions: (
      transitioningSuggestionLocation === 'input' && transitionPhase === 'sectionFade'
    ),
    isTransitioningLandingSuggestionItems: (
      transitioningSuggestionLocation === 'landing' && transitionPhase !== null
    ),
    isTransitioningLandingSuggestions: (
      transitioningSuggestionLocation === 'landing' && transitionPhase === 'sectionFade'
    ),
    landingSuggestionsToRender,
    onInputSuggestionClick: (suggestion: SearchSuggestion) => (
      applySuggestionWithTransition(suggestion, 'input')
    ),
    onLandingSuggestionClick: (suggestion: SearchSuggestion) => (
      applySuggestionWithTransition(suggestion, 'landing')
    ),
    setActiveSuggestionIndex,
    shouldShowInputSuggestions: search.shouldShowInputSuggestions,
    shouldShowLandingSuggestions,
    transitioningSuggestionKey,
  };
}
