import { useMoments, useStory } from '../../hooks';
import StoriesAPIButton from '../StoriesAPIButton/StoriesAPIButton';
import type { StoryButtonProps } from './StoryButton.types';

export default function StoryButton({ button, ...props }: StoryButtonProps) {
  const { collectionId, storyId } = useStory();
  const { selectMoment } = useMoments();
  const buttonIsMomentWithinSameStory = !button.newTab && (
    'moment' in button && collectionId === button.collectionId && storyId && button.storyId
  );
  const handleClick = buttonIsMomentWithinSameStory ? (
    () => selectMoment(button.moment)
  ) : undefined;
  return (
    <StoriesAPIButton
      button={button}
      color={button.color ?? 'primary'}
      onClick={handleClick}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}
