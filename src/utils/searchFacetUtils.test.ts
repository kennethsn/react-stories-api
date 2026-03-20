import {
  deserializeSelectedSearchFacets,
  serializeSelectedSearchFacets,
} from './searchFacetUtils';

describe('searchFacetUtils serialization', () => {
  it('deserializes serialized selected facets from router query string', () => {
    const selectedFacets = {
      category: ['poetry', 'history'],
      publication_year: 1925,
      range: {
        max: 1940,
        min: 1900,
      },
      published_at: {
        end: '1940-12-31',
        start: '1900-01-01',
      },
    };

    const serialized = serializeSelectedSearchFacets(selectedFacets);

    expect(deserializeSelectedSearchFacets(serialized)).toEqual(selectedFacets);
  });

  it('returns an empty object for missing or empty facets string', () => {
    expect(deserializeSelectedSearchFacets(undefined)).toEqual({});
    expect(deserializeSelectedSearchFacets(null)).toEqual({});
    expect(deserializeSelectedSearchFacets('')).toEqual({});
  });
});
