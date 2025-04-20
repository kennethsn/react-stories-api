import { observer } from 'mobx-react-lite';

import useMoments from '../../hooks/useMoments';
import useStory from '../../hooks/useStory';
import StoriesAPIButton from '../StoriesAPIButton/StoriesAPIButton';
import type { StoryButtonProps } from './StoryButton.types';

const StoryButton = observer(({ button, ...props }: StoryButtonProps) => {
  const story = useStory();
  const moments = useMoments();
  const buttonIsMomentWithinSameStory = story.isMomentButtonWithinSameStory(button);
  const handleClick = buttonIsMomentWithinSameStory ? (
    () => moments.goToMomentId(button.moment_id)
  ) : undefined;
  return (
    <StoriesAPIButton
      button={button}
      onClick={handleClick}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
});

export default StoryButton;
