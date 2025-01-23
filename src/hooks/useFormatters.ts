import useStoriesAPI from './useStoriesAPI';

export default function useFormatters() {
  const storiesAPI = useStoriesAPI();
  return storiesAPI.formatters;
}
