import type {
  SearchFacet,
  SearchFacetBounds,
  SearchFacetDateRangeValue,
  SearchFacetNumberRangeValue,
  SearchFacetValue,
  SearchFacetValueRef,
  SelectedSearchFacets,
} from '../types';

export type SearchFacetOption = {
  readonly count: number;
  readonly description?: string;
  readonly formattedCount: string;
  readonly label: string;
  readonly value: string;
};

const DEFAULT_MAX_YEAR = new Date().getFullYear();
const DEFAULT_MIN_YEAR = 1900;

export const buildCheckboxOptions = (
  allOptions: SearchFacetOption[],
  filteredOptions: SearchFacetOption[],
  selectedValues: string[],
  maxVisible: number,
): SearchFacetOption[] => {
  const selectedSet = new Set(selectedValues);
  const selectedOptions = allOptions.filter((opt) => selectedSet.has(opt.value));
  const unselectedOptions = filteredOptions.filter((opt) => !selectedSet.has(opt.value));
  return [...selectedOptions, ...unselectedOptions].slice(0, maxVisible);
};

export const buildDateRangeValueFromInputs = (
  startValue: string,
  endValue: string,
): SearchFacetDateRangeValue => ({
  end: endValue.trim() !== '' ? endValue : undefined,
  start: startValue.trim() !== '' ? startValue : undefined,
});

export const buildFacetOptions = (
  valueRefs: SearchFacetValueRef[],
  formatCount: (value: number) => string,
): SearchFacetOption[] => (
  valueRefs.map((ref) => ({
    count: ref.count,
    description: ref.description ?? undefined,
    formattedCount: formatCount(ref.count),
    label: ref.label ?? ref.value,
    value: ref.value,
  }))
);

export const buildNumberRangeValueFromInputs = (
  minValue: string,
  maxValue: string,
): SearchFacetNumberRangeValue => {
  const minNum = minValue.trim() !== '' ? parseFloat(minValue) : undefined;
  const maxNum = maxValue.trim() !== '' ? parseFloat(maxValue) : undefined;

  return {
    max: !Number.isNaN(maxNum!) ? maxNum : undefined,
    min: !Number.isNaN(minNum!) ? minNum : undefined,
  };
};

export const buildYearRangeValue = (value: number[]): SearchFacetDateRangeValue => ({
  end: formatYearAsDate(value[1]),
  start: formatYearAsDate(value[0]),
});

export const doesSearchFacetHaveValue = (value: SearchFacetValue | undefined): boolean => {
  if (value === undefined) {
    return false;
  }
  if (isStringArrayValue(value)) {
    return value.length > 0;
  }
  if (isNumberValue(value)) {
    return true;
  }
  if (isNumberRangeValue(value)) {
    return value.min !== undefined || value.max !== undefined;
  }
  if (isDateRangeValue(value)) {
    return value.start !== undefined || value.end !== undefined;
  }
  return false;
};

/**
 * Format ISO date string to M/D/YYYY
 * @example formatDateDisplay('2023-12-25') => '12/25/2023'
 */
export const formatDateDisplay = (isoDate: string | undefined | null): string => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export const formatDateRangeValue = (value: SearchFacetDateRangeValue): string => {
  const parts: string[] = [];
  if (value.start) parts.push(`from ${formatDateDisplay(value.start)}`);
  if (value.end) parts.push(`to ${formatDateDisplay(value.end)}`);
  return parts.join(' ') || 'Any date';
};

export const formatNumberRangeValue = (value: SearchFacetNumberRangeValue): string => {
  const parts: string[] = [];
  if (value.min !== undefined && value.min !== null) parts.push(`from ${value.min}`);
  if (value.max !== undefined && value.max !== null) parts.push(`to ${value.max}`);
  return parts.join(' ') || 'Any value';
};

export const formatYearAsDate = (year: number): string => `${year}-01-01`;

export const getDateRangeInputValues = (
  value: SearchFacetValue | undefined,
): { endValue: string; startValue: string } => (
  value && isDateRangeValue(value)
    ? {
      endValue: value.end || '',
      startValue: value.start || '',
    }
    : { endValue: '', startValue: '' }
);

export const getNumberInputValue = (value: SearchFacetValue | undefined): string => (
  value && isNumberValue(value) ? value.toString() : ''
);

export const getNumberRangeInputValues = (
  value: SearchFacetValue | undefined,
): { maxValue: string; minValue: string } => (
  value && isNumberRangeValue(value)
    ? {
      maxValue: value.max !== undefined && value.max !== null ? value.max.toString() : '',
      minValue: value.min !== undefined && value.min !== null ? value.min.toString() : '',
    }
    : { maxValue: '', minValue: '' }
);

export const getSearchFacetLabel = (searchFacet: SearchFacet): string => (
  searchFacet.label ?? searchFacet.key
);

/**
 * Extract year from ISO date string
 * @example getYearFromDate('2023-12-25') => 2023
 */
export const getYearFromDate = (isoDate: string | undefined | null): number | undefined => {
  if (!isoDate) return undefined;
  const year = parseInt(isoDate.split('-')[0], 10);
  return Number.isNaN(year) ? undefined : year;
};

export const getYearRangeBounds = (
  bounds: SearchFacetBounds | undefined,
  defaultMin: number = DEFAULT_MIN_YEAR,
  defaultMax: number = DEFAULT_MAX_YEAR,
): { maxYear: number; minYear: number } => {
  const minYear = getYearFromValue(bounds?.min) ?? defaultMin;
  const maxYear = getYearFromValue(bounds?.max) ?? defaultMax;
  return { maxYear, minYear };
};

export const getYearRangeSelection = (value: SearchFacetValue | undefined): boolean => (
  !!value
  && isDateRangeValue(value)
  && (value.start !== undefined || value.end !== undefined)
);

export const getYearRangeValue = (
  value: SearchFacetValue | undefined,
  minYear: number,
  maxYear: number,
): number[] => (
  value && isDateRangeValue(value)
    ? [
      getYearFromDate(value.start) ?? minYear,
      getYearFromDate(value.end) ?? maxYear,
    ]
    : [minYear, maxYear]
);

export const isDateRangeValue = (value: SearchFacetValue): value is SearchFacetDateRangeValue => (
  typeof value === 'object'
  && value !== null
  && !Array.isArray(value)
  && ('start' in value || 'end' in value)
);

export const isNumberRangeValue = (
  value: SearchFacetValue,
): value is SearchFacetNumberRangeValue => (
  typeof value === 'object'
  && value !== null
  && !Array.isArray(value)
  && ('min' in value || 'max' in value)
);

export const isNumberValue = (
  value: SearchFacetValue,
): value is number => typeof value === 'number';

export const isStringArrayValue = (
  value: SearchFacetValue,
): value is string[] => Array.isArray(value);

export const parseNumberInputValue = (value: string): number | null | undefined => {
  if (value.trim() === '') {
    return null;
  }
  const numValue = parseFloat(value);
  return Number.isNaN(numValue) ? undefined : numValue;
};

export const serializeSearchFacetValue = (value: SearchFacetValue): string => {
  if (isStringArrayValue(value)) {
    return JSON.stringify(value);
  }
  if (isNumberValue(value)) {
    return value.toString();
  }
  if (isDateRangeValue(value)) {
    return JSON.stringify({
      end: value.end || null,
      start: value.start || null,
    });
  }
  if (isNumberRangeValue(value)) {
    return JSON.stringify({
      max: value.max ?? null,
      min: value.min ?? null,
    });
  }
  return String(value);
};

/**
 * Serializes facet selections into a query-string-friendly format.
 * @example
 * serializeSelectedSearchFacets({
 *   category: ['paintings', 'sculptures'],
 *   year: 1923,
 *   year_range: { min: 1900, max: 1950 },
 *   date_range: { start: '1900-01-01', end: '1950-12-31' },
 * })
 * => 'category=%5B%22paintings%22,%22sculptures%22%5D \
 *    &date_range=%7B%22end%22:%221950-12-31%22,%22start%22:%221900-01-01%22%7D \
 *    &year=1923&year_range=%7B%22max%22:1950,%22min%22:1900%7D'
 */
export const serializeSelectedSearchFacets = (facets: SelectedSearchFacets): string => {
  const parts = Object.entries(facets)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => {
      const serializedValue = serializeSearchFacetValue(value);
      return `${encodeURIComponent(key)}=${encodeURIComponent(serializedValue)}`;
    });

  return parts.join('&');
};

export const shouldShowFacetAutocomplete = (
  optionsLength: number,
  maxVisible: number,
): boolean => optionsLength > maxVisible;

export const sortAndFilterFacetOptions = (
  options: SearchFacetOption[],
  term: string,
): SearchFacetOption[] => {
  const normalizedTerm = term.trim().toLowerCase();
  return options
    .filter((opt) => (
      opt.label.toLowerCase().includes(normalizedTerm)
      || opt.value.toLowerCase().includes(normalizedTerm)
    ))
    .sort((a, b) => b.count - a.count);
};

export const updateYearRangeFromInput = (
  newValueStr: string,
  currentValue: number[],
  minYear: number,
  maxYear: number,
  isStart: boolean,
): number[] | null => {
  const newYear = parseInt(newValueStr, 10);
  if (Number.isNaN(newYear)) {
    return null;
  }
  const clampedYear = Math.max(minYear, Math.min(maxYear, newYear));

  if (isStart) {
    const endYear = clampedYear > currentValue[1] ? maxYear : currentValue[1];
    return [clampedYear, endYear];
  }

  const startYear = clampedYear < currentValue[0] ? minYear : currentValue[0];
  return [startYear, clampedYear];
};

export const getYearFromValue = (value: number | string | null | undefined): number | undefined => {
  if (value === null || value === undefined) {
    return undefined;
  }
  if (typeof value === 'number') {
    return value;
  }
  return getYearFromDate(String(value));
};
