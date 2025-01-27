import FileDownloadTwoToneIcon from '@mui/icons-material/FileDownloadTwoTone';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';

import ActionButton from '../ActionButton/ActionButton';
import type { BoundActionsProps } from './BoundActions.types';

const BoundActions = observer(({
  children,
  store,
  sx,
  type,
}: BoundActionsProps) => {
  const saveButtonTitle = store.isSaved ? `${type} Saved Successfully!` : `Save ${type}`;

  const handleDownloadButtonClick = () => {
    store.download();
  };

  const handleSaveButtonClick = () => {
    store.save();
  };

  const handleResetButtonClick = () => {
    store.reset();
  };

  return (
    <Box sx={sx}>
      <ActionButton
        icon={FileDownloadTwoToneIcon}
        isHidden={!store.isDownloadable}
        onClick={handleDownloadButtonClick}
        title={`Download ${type}`}
      />

      <ActionButton
        icon={HighlightOffIcon}
        isHidden={!store.isResettable}
        onClick={handleResetButtonClick}
        title={`Reset ${type}`}
      />

      <ActionButton
        color="primary"
        icon={PublishedWithChangesIcon}
        isDisabled={!store.isSavable}
        isHidden={!store.isEditable}
        isLoading={store.isSaving}
        isSuccessful={store.isSaved}
        onClick={handleSaveButtonClick}
        title={saveButtonTitle}
      />

      {children}
    </Box>
  );
});

export default BoundActions;
