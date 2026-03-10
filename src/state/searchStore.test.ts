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
      .fn<Promise<number>, [string]>()
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
      .fn<Promise<number>, [string]>()
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
});
