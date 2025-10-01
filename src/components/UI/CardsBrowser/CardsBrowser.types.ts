import type { PropsWithChildren } from 'react';

import type PaginationStore from '../../../state/paginationStore';
import type SearchStore from '../../../state/searchStore';

export type CardsBrowserLayout = 'tool';

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
