import useStoriesAPI from './useStoriesAPI';

export default function useStories() {
  const storiesAPI = useStoriesAPI();
  return storiesAPI.stories;
}
