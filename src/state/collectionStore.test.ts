import CollectionStore from './collectionStore';

const buildCollection = () => ({
  id: 1,
  name: 'Test Collection',
  status: 'PUBLISHED' as const,
});

const buildRoot = () => ({
  api: {
    getStories: jest.fn().mockResolvedValue({
      count: 0,
      last_page: 1,
      stories: [],
      total_count: 0,
    }),
  },
  formatters: {
    collectionStoriesListHeader: 'Stories',
    formatCollectionPageTitle: jest.fn(),
  },
  locale: {
    hasAlternativeLocales: false,
  },
});

describe('CollectionStore search start mode', () => {
  it('defers initial stories load in emptyLanding mode when there is no search content', async () => {
    const root = buildRoot();
    const store = new CollectionStore(root as never, {
      collection: buildCollection(),
      onSearch: async () => {},
      searchStartMode: 'emptyLanding',
      source: 'api',
    });

    await store.init();

    expect(root.api.getStories).not.toHaveBeenCalled();
    expect(store.initialized).toBe(true);
  });

  it('loads stories initially in emptyLanding mode when a default query is provided', async () => {
    const root = buildRoot();
    const store = new CollectionStore(root as never, {
      collection: buildCollection(),
      onSearch: async () => {},
      searchDefaultQuery: 'langston hughes',
      searchStartMode: 'emptyLanding',
      source: 'api',
    });

    await store.init();

    expect(root.api.getStories).toHaveBeenCalledTimes(1);
  });
});
