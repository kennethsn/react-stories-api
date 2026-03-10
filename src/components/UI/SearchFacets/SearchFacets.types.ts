import type SearchStore from '../../../state/searchStore';
import type { SearchFacet } from '../../../types';

export type SearchFacetDateRangeProps = {
  readonly search: SearchStore;
  readonly searchFacet: SearchFacet;
};

export type SearchFacetLabelProps = {
  readonly description?: string | null;
  readonly hasValue: boolean;
  readonly label: string;
  readonly onClear?: () => void;
};

export type SearchFacetNumberInputProps = {
  readonly search: SearchStore;
  readonly searchFacet: SearchFacet;
};

export type SearchFacetNumberRangeProps = {
  readonly search: SearchStore;
  readonly searchFacet: SearchFacet;
};

export type SearchFacetProps = SearchFacetSelectorProps;

export type SearchFacetSelectorControlsProps = {
  readonly onDeselectAll: () => void;
  readonly onSelectAll: () => void;
  readonly selectedCount: number;
};

export type SearchFacetSelectorProps = {
  readonly search: SearchStore;
  readonly searchFacet?: SearchFacet;
  readonly searchFacetKey: string;
};

export type SearchFacetsProps = {
  readonly search: SearchStore
};
