import useStoriesAPI from './useStoriesAPI';

export default function useAV() {
  const storiesAPI = useStoriesAPI();
  return storiesAPI.av;
}
