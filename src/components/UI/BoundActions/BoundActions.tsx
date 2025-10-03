import FileDownloadTwoToneIcon from '@mui/icons-material/FileDownloadTwoTone';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';

import { classNames } from '../../../utils/dom';
import ActionButton from '../ActionButton/ActionButton';
import LocaleActionButton from '../LocaleActionButton/LocaleActionButton';
import type { BoundActionsProps } from './BoundActions.types';

const getSaveButtonTitle = (type: string, store: BoundActionsProps['store']) => {
  if (store.isFailed) {
    return `Failed to save ${type}. Please reset ${type} or try again`;
  }
  if (store.isSaved) {
    return `${type} Saved Successfully!`;
  }
  return `Save ${type}`;
};

const BoundActions = observer(({
  append,
  className,
  prepend,
  store,
  sx,
  type,
}: BoundActionsProps) => {
  const saveButtonTitle = getSaveButtonTitle(type, store);

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
    <Box
      className={classNames('BoundActions', className)}
      sx={sx}
    >
      {prepend}

      <LocaleActionButton isHidden={!store.isLocalizable} />

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
        isFailed={store.isFailed}
        isHidden={!store.isEditable}
        isLoading={store.isSaving}
        isSuccessful={store.isSaved}
        onClick={handleSaveButtonClick}
        title={saveButtonTitle}
      />

      {append}
    </Box>
  );
});

export default BoundActions;
