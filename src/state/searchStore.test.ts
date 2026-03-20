import SearchStore from './searchStore';

type Deferred<T> = {
  promise: Promise<T>;
  resolve: (value: T) => void;
};

function createDeferred<T>(): Deferred<T> {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((res) => {
    resolve = res;
  });
  return { promise, resolve };
}

describe('SearchStore request concurrency', () => {
  it('runs a trailing request when a new selection is made during loading', async () => {
    const first = createDeferred<number>();
    const second = createDeferred<number>();
    const onSearch = jest
      .fn<Promise<number>, [boolean?]>()
      .mockImplementationOnce(() => first.promise)
      .mockImplementationOnce(() => second.promise);

    const store = new SearchStore({} as never, {
      onSearch,
      searchOnFacetChange: true,
    });

    // Make facet changes submit immediately for deterministic tests.
    store.debouncedSubmit = () => {
      store.submit();
    };

    store.selectFacetValue('category', 'paintings');
    store.selectFacetValue('category', 'sculptures');

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(store.loading).toBe(true);

    first.resolve(10);
    await Promise.resolve();

    expect(onSearch).toHaveBeenCalledTimes(2);
    expect(store.loading).toBe(true);

    second.resolve(20);
    await Promise.resolve();

    expect(store.loading).toBe(false);
    expect(store.count).toBe(20);
  });

  it('coalesces many rapid changes into one trailing request', async () => {
    const first = createDeferred<number>();
    const second = createDeferred<number>();
    const onSearch = jest
      .fn<Promise<number>, [boolean?]>()
      .mockImplementationOnce(() => first.promise)
      .mockImplementationOnce(() => second.promise);

    const store = new SearchStore({} as never, {
      onSearch,
      searchOnFacetChange: true,
    });

    store.debouncedSubmit = () => {
      store.submit();
    };

    store.selectFacetValue('category', 'a');
    store.selectFacetValue('category', 'b');
    store.deselectFacetValue('category', 'a');
    store.selectFacetValue('category', 'c');

    expect(onSearch).toHaveBeenCalledTimes(1);

    first.resolve(5);
    await Promise.resolve();

    expect(onSearch).toHaveBeenCalledTimes(2);

    second.resolve(8);
    await Promise.resolve();

    expect(onSearch).toHaveBeenCalledTimes(2);
    expect(store.loading).toBe(false);
    expect(store.count).toBe(8);
  });

  it('does not trigger trailing fetch when only draft query changes during loading', async () => {
    const first = createDeferred<number>();
    const onSearch = jest
      .fn<Promise<number>, [boolean?]>()
      .mockImplementationOnce(() => first.promise);

    const store = new SearchStore({} as never, {
      onSearch,
      query: 'langston',
    });

    const firstSubmitPromise = store.submit();

    // User keeps typing, but has not submitted the new draft query.
    store.setQuery('langston hughes');

    first.resolve(10);
    await firstSubmitPromise;

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenNthCalledWith(1, false);
    expect(store.committedQuery).toBe('langston');
    expect(store.count).toBe(10);
    expect(store.loading).toBe(false);
  });

  it('queues explicit submit during loading and uses the latest draft query', async () => {
    const first = createDeferred<number>();
    const second = createDeferred<number>();
    const onSearch = jest
      .fn<Promise<number>, [boolean?]>()
      .mockImplementationOnce(() => first.promise)
      .mockImplementationOnce(() => second.promise);

    const store = new SearchStore({} as never, {
      onSearch,
      query: 'langston',
    });

    const firstSubmitPromise = store.submit();

    store.setQuery('langston hughes');
    store.submit();

    first.resolve(10);
    await Promise.resolve();

    expect(onSearch).toHaveBeenCalledTimes(2);
    expect(onSearch).toHaveBeenNthCalledWith(1, false);
    expect(onSearch).toHaveBeenNthCalledWith(2, false);
    expect(store.committedQuery).toBe('langston hughes');

    second.resolve(20);
    await firstSubmitPromise;

    expect(store.count).toBe(20);
    expect(store.loading).toBe(false);
  });

  it('does not apply stale count when committed facets change during an in-flight request', async () => {
    const first = createDeferred<number>();
    const second = createDeferred<number>();
    const onSearch = jest
      .fn<Promise<number>, [boolean?]>()
      .mockImplementationOnce(() => first.promise)
      .mockImplementationOnce(() => second.promise);

    const store = new SearchStore({} as never, {
      onSearch,
      searchOnFacetChange: true,
    });

    store.setQuery('langston');
    const firstSubmitPromise = store.submit();

    // Simulate committed facet updates while the first request is running.
    store.selectFacetValue('category', 'poetry');

    first.resolve(10);
    await Promise.resolve();

    // A trailing request should run and stale count should not be committed.
    expect(onSearch).toHaveBeenCalledTimes(2);
    expect(onSearch).toHaveBeenNthCalledWith(1, false);
    expect(onSearch).toHaveBeenNthCalledWith(2, false);
    expect(store.count).not.toBe(10);
    expect(store.loading).toBe(true);

    second.resolve(20);
    await firstSubmitPromise;

    expect(store.count).toBe(20);
    expect(store.loading).toBe(false);
  });
});

describe('SearchStore suggestions', () => {
  it('shows input suggestions when query is typed and input suggestions are enabled', () => {
    const onSearch = jest.fn<Promise<number>, [boolean?]>().mockResolvedValue(0);
    const store = new SearchStore({} as never, {
      onSearch,
      suggestions: [
        {
          display_name: 'Langston Hughes',
          query: 'langston hughes',
          locations: { input: true, landing: false },
        },
      ],
    });

    store.setFocused(true);
    store.setQuery('lang');

    expect(store.shouldShowInputSuggestions).toBe(true);
    expect(store.inputSuggestions).toHaveLength(1);
    expect(store.shouldShowLandingSuggestions).toBe(false);
  });

  it('shows landing suggestions only in emptyLanding mode with no search content', () => {
    const onSearch = jest.fn<Promise<number>, [boolean?]>().mockResolvedValue(0);
    const store = new SearchStore({} as never, {
      onSearch,
      startMode: 'emptyLanding',
      suggestions: [
        {
          display_name: 'Civil Rights',
          query: 'civil rights',
          locations: { landing: true, input: false },
        },
      ],
    });

    expect(store.shouldShowLandingSuggestions).toBe(true);

    store.setQuery('civil');

    expect(store.shouldShowLandingSuggestions).toBe(false);
  });

  it('applies suggestion query and facets before searching', async () => {
    const onSearch = jest.fn<Promise<number>, [boolean?]>().mockResolvedValue(3);
    const store = new SearchStore({} as never, {
      onSearch,
      suggestions: [
        {
          display_name: 'Langston Hughes',
          query: 'langston hughes',
          facets: {
            category: ['poetry'],
          },
        },
      ],
    });

    await store.applySuggestion(store.suggestions[0]);

    expect(store.query).toBe('langston hughes');
    expect(store.committedQuery).toBe('langston hughes');
    expect(store.selectedFacets).toEqual({ category: ['poetry'] });
    expect(onSearch).toHaveBeenCalledWith(false);
  });

  it('keeps query blank when suggestion query is missing or null', async () => {
    const onSearch = jest.fn<Promise<number>, [boolean?]>().mockResolvedValue(5);
    const store = new SearchStore({} as never, {
      onSearch,
      suggestions: [
        {
          display_name: 'Works during the Harlem Renaissance',
          facets: {
            P8: ['Q4'],
          },
          query: null,
        },
      ],
    });

    await store.applySuggestion(store.suggestions[0]);

    expect(store.query).toBe('');
    expect(store.committedQuery).toBe('');
    expect(store.selectedFacets).toEqual({ P8: ['Q4'] });
    expect(onSearch).toHaveBeenCalledWith(false);
  });

  it('shows suggestion display name as placeholder while loading, then restores default', async () => {
    const deferred = createDeferred<number>();
    const onSearch = jest.fn<Promise<number>, [boolean?]>().mockImplementation(
      () => deferred.promise,
    );
    const store = new SearchStore({} as never, {
      onSearch,
      placeholder: 'Search collection...',
      suggestions: [
        {
          display_name: 'Works during the Harlem Renaissance',
          facets: {
            P8: ['Q4'],
          },
          query: null,
        },
      ],
    });

    const applyPromise = store.applySuggestion(store.suggestions[0]);

    expect(store.loading).toBe(true);
    expect(store.placeholder).toBe('Works during the Harlem Renaissance');
    expect(onSearch).toHaveBeenCalledWith(false);

    deferred.resolve(4);
    await applyPromise;

    expect(store.loading).toBe(false);
    expect(store.placeholder).toBe('Search collection...');
  });
});
