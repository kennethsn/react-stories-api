import type { PropsWithChildren } from 'react';

import type PaginationStore from '../../../state/paginationStore';
import type SearchStore from '../../../state/searchStore';

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

export type CardsBrowserLayoutProps = Omit<CardsBrowserProps, 'layout'>;

export type CardsBrowserSearchProps = {
  readonly search: SearchStore;
  readonly slots?: {
    readonly AfterSearchInput?: React.ReactNode;
  }
};

export type ToolCardsBrowserFacetsPanelProps = {
  readonly search: SearchStore;
};
