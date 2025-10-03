import type SearchStore from '../../../state/searchStore';

export type SearchFacetSelectorControlsProps = {
  readonly onDeselectAll: () => void;
  readonly onSelectAll: () => void;
  readonly selectedCount: number;
};

export type SearchFacetSelectorProps = {
  readonly search: SearchStore;
  readonly searchFacetKey: string;
};

export type SearchFacetsProps = {
  readonly search: SearchStore
};
