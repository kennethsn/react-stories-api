import useStory from './useStory';

const useStorySlot = (component: string) => {
  const story = useStory();
  return {
    Component: story.getSlotComponent(component)!,
    slotIsAvailable: story.isSlotAvailable(component),
  };
};

export default useStorySlot;
