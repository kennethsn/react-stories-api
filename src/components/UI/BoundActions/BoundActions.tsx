import FileDownloadTwoToneIcon from '@mui/icons-material/FileDownloadTwoTone';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';

import useLocale from '../../../hooks/useLocale';
import { classNames } from '../../../utils/dom';
import ActionButton from '../ActionButton/ActionButton';
import LocaleActionButton from '../LocaleActionButton/LocaleActionButton';
import type { BoundActionsProps } from './BoundActions.types';

const getSaveButtonTitle = (type: string, store: BoundActionsProps['store'], t: (key: string) => string) => {
  if (store.isFailed) {
    return `${t('save_failed')} ${type}`;
  }
  if (store.isSaved) {
    return `${type} ${t('save_success')}`;
  }
  return `${t('save')} ${type}`;
};

const BoundActions = observer(({
  append,
  className,
  prepend,
  store,
  sx,
  type,
}: BoundActionsProps) => {
  const { t } = useLocale();

  const saveButtonTitle = getSaveButtonTitle(type, store, t);

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
        title={`${t('download')} ${type}`}
      />

      <ActionButton
        icon={HighlightOffIcon}
        isHidden={!store.isResettable}
        onClick={handleResetButtonClick}
        title={`${t('reset')} ${type}`}
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
