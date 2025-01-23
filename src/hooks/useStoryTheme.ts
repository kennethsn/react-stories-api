import useStoriesAPITheme from './useStoriesAPITheme';
import useStory from './useStory';

const useStoryTheme = () => {
  const story = useStory();
  const { isDesktop, isMobile } = useStoriesAPITheme();
  return {
    layoutIsFullscreen: story.isFullscreen,
    layoutIsDesktop: story.isLayoutDesktop(isDesktop),
    layoutIsMobile: story.isLayoutMobile(isMobile),
  };
};

export default useStoryTheme;
