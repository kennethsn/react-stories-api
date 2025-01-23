import useStoriesAPI from './useStoriesAPI';

export default function useCollections() {
  const storiesAPI = useStoriesAPI();
  return storiesAPI.collections;
}
