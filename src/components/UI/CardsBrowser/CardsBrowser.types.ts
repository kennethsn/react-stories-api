import type { PropsWithChildren } from 'react';

import type PaginationStore from '../../../state/paginationStore';
import type SearchStore from '../../../state/searchStore';
import type { SearchSuggestion } from '../../../types';

export type CardsBrowserLayout =
  'minimal' // cards and pagination
  | 'standard' // cards, pagination, and search (falls back to minimal dynamically)
  | 'tool'; // cards, pagination, search, and facets panel (falls back to standard dynamically)

export type CardsBrowserProps = PropsWithChildren<{
  readonly layout?: CardsBrowserLayout;
  readonly pagination?: PaginationStore;
  readonly search?: SearchStore;
  readonly slots?: {
    readonly CardsBrowserSearch?: React.ReactNode;
  };
}>;

export type CardsBrowserInputSuggestionsProps = {
  readonly activeSuggestionIndex: number;
  readonly isSectionTransitioning: boolean;
  readonly isTransitioning: boolean;
  readonly onSuggestionClick: (suggestion: SearchSuggestion) => void | Promise<void>;
  readonly onSuggestionHover: (index: number) => void;
  readonly suggestions: SearchSuggestion[];
  readonly transitioningSuggestionKey: string | null;
};

export type CardsBrowserLandingSuggestionsProps = {
  readonly isSectionTransitioning: boolean;
  readonly isTransitioning: boolean;
  readonly onSuggestionClick: (suggestion: SearchSuggestion) => void | Promise<void>;
  readonly overlineText: string;
  readonly showLandingOverline: boolean;
  readonly showLandingTitle: boolean;
  readonly suggestions: SearchSuggestion[];
  readonly titleText: string;
  readonly transitioningSuggestionKey: string | null;
};

export type CardsBrowserLayoutProps = Omit<CardsBrowserProps, 'layout'>;

export type CardsBrowserSearchProps = {
  readonly isLoading?: boolean;
  readonly search: SearchStore;
  readonly slots?: {
    readonly AfterSearchInput?: React.ReactNode;
  }
};

export type ToolCardsBrowserFacetsPanelProps = {
  readonly search: SearchStore;
};
