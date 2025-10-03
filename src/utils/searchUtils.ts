import type { SelectedSearchFacets } from '../types';
/**
 * Serializes a facet object into a query string.
 * @example
 * serializeSelectedSearchFacets(
 *   { a: ['1', '2'], b: ['word, with comma', 'simple', 'with "quotes"'] }
 * ) => 'a=["1","2"]&b=["word, with comma","simple","with \\"quotes\\""]'
 */
export const serializeSelectedSearchFacets = (facets: SelectedSearchFacets): string => {
  const parts = Object.entries(facets).map(([key, values]) => {
    const encodedValues = values.map((v) => `"${v.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`);
    return `${encodeURIComponent(key)}=[${encodedValues.join(',')}]`;
  });

  return parts.join('&');
};

export default {
  serializeSelectedSearchFacets,
};
