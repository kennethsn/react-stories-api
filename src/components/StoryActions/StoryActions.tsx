import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { observer } from 'mobx-react-lite';

import useStory from '../../hooks/useStory';
import ActionButton from '../UI/ActionButton/ActionButton';
import BoundActions from '../UI/BoundActions/BoundActions';

const StoryActions = observer(() => {
  const story = useStory();

  const handlePauseButtonClick = () => {
    story.pause();
  };

  return (
    <BoundActions
      store={story}
      type="Story"
    >
      <ActionButton
        color="primary"
        icon={PauseCircleOutlineIcon}
        isHidden={!story.isPlaying}
        onClick={handlePauseButtonClick}
        title={`Pause ${story.avType}`}
      />
    </BoundActions>
  );
});

export default StoryActions;
