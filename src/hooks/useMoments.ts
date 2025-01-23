import useStory from './useStory';

export default function useMoments() {
  const story = useStory();
  return story.moments;
}
