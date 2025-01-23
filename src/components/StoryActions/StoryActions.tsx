import FileDownloadTwoToneIcon from '@mui/icons-material/FileDownloadTwoTone';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';

import useStory from '../../hooks/useStory';
import ActionButton from '../UI/ActionButton/ActionButton';

const StoryActions = observer(() => {
  const story = useStory();

  const handleDownloadButtonClick = () => {
    story.download();
  };

  const handleSaveButtonClick = () => {
    story.save();
  };

  const handleResetButtonClick = () => {
    story.reset();
  };

  const handlePauseButtonClick = () => {
    story.pause();
  };

  return (
    <Box>
      <ActionButton
        icon={FileDownloadTwoToneIcon}
        isHidden={!story.isDownloadable}
        onClick={handleDownloadButtonClick}
        title={`Download "${story.label}" Story`}
      />

      <ActionButton
        icon={HighlightOffIcon}
        isHidden={!story.isResettable}
        onClick={handleResetButtonClick}
        title="Reset Story"
      />

      <ActionButton
        color="primary"
        icon={PublishedWithChangesIcon}
        isDisabled={!story.isSavable}
        isLoading={story.isSaving}
        isSuccessful={story.isSaved}
        onClick={handleSaveButtonClick}
        title={story.saveButtonTitle}
      />

      <ActionButton
        color="primary"
        icon={PauseCircleOutlineIcon}
        isHidden={!story.isPlaying}
        onClick={handlePauseButtonClick}
        title={`Pause Story ${story.avType}`}
      />
    </Box>
  );
});

export default StoryActions;
