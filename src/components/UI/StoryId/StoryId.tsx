import MenuItem from '@mui/material/MenuItem';
import type { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useId } from 'react';

import useFormatters from '../../../hooks/useFormatters';
import useLocale from '../../../hooks/useLocale';
import useStoriesAPI from '../../../hooks/useStoriesAPI';
import useStoriesAPINavigation from '../../../hooks/useStoriesAPINavigation';
import type { StoryIdActionContext } from '../../../types';
import { copyToClipboard } from '../../../utils/clipboard';
import { deepMerge } from '../../../utils/object';
import MenuTooltip from '../MenuTooltip/MenuTooltip';
import {
  buildStoryIdActionMap,
  getEnabledStoryIdActions,
  getStoryIdActions,
} from './StoryId.helpers';
import styles from './StoryId.styles';
import type { StoryIdProps } from './StoryId.types';

const StoryId = observer(({
  actions: actionsProp,
  externalUrl,
  menuTooltipProps,
  story,
  variant = 'caption',
  ...typographyProps
}: StoryIdProps) => {
  const instanceId = useId().replace(/:/g, '');
  const {
    sx: propsSx,
    ...restTypographyProps
  } = typographyProps;
  const menuId = `story-id-menu-${story.id}-${instanceId}`;
  const { t } = useLocale();
  const storiesAPI = useStoriesAPI();
  const formatters = useFormatters();
  const { goTo } = useStoriesAPINavigation({
    collection_id: story.collection_id,
    story_id: story.id,
  });
  const formattedExternalUrl = formatters.formatExternalStoryUrl({
    collection_id: story.collection_id,
    story_id: story.id,
  });
  const resolvedExternalUrl = externalUrl ?? formattedExternalUrl;
  const hasExternalUrl = !!resolvedExternalUrl;
  const { goTo: goToExternal } = useStoriesAPINavigation({
    new_tab: true,
    url: resolvedExternalUrl || '',
  });
  const triggerSx: SxProps<Theme> = propsSx
    ? [styles.trigger, ...(Array.isArray(propsSx) ? propsSx : [propsSx])]
    : styles.trigger;

  const handleCopyToClipboard = async () => {
    await copyToClipboard(story.id);
  };

  const handleGoToStory = () => {
    goTo();
  };

  const handleGoToExternal = () => {
    if (hasExternalUrl) {
      goToExternal();
    }
  };
  const customActionMap = storiesAPI.storyIdActions ?? {};
  const actionContext: StoryIdActionContext = {
    closeMenu: () => storiesAPI.menus.close(),
    story,
  };
  const actionMap = buildStoryIdActionMap({
    t,
    hasExternalUrl,
    onCopyToClipboard: handleCopyToClipboard,
    onGoToExternal: handleGoToExternal,
    onGoToStory: handleGoToStory,
  });
  const {
    menuProps: customMenuProps,
    stopPropagation: customStopPropagation,
    ...restMenuTooltipProps
  } = menuTooltipProps ?? {};
  const menuProps = deepMerge({
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
  }, customMenuProps ?? {});
  const stopPropagation = customStopPropagation ?? true;
  const actions = getStoryIdActions(actionsProp, customActionMap);
  const enabledActions = getEnabledStoryIdActions({
    actions,
    actionMap,
    customActionMap,
    context: actionContext,
  });

  return (
    <MenuTooltip
      id={menuId}
      menuProps={menuProps}
      stopPropagation={stopPropagation}
      trigger={(
        <Typography
          sx={triggerSx}
          variant={variant}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...restTypographyProps}
        >
          {story.id}
        </Typography>
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restMenuTooltipProps}
    >
      {enabledActions.map((actionConfig) => {
        if (!actionConfig) {
          return null;
        }
        if (actionConfig.render) {
          return actionConfig.render(actionContext);
        }
        const ActionIcon = actionConfig.icon;
        const handleMenuItemClick = actionConfig.onClick;
        return (
          <MenuItem
            key={actionConfig.name}
            onClick={() => handleMenuItemClick?.(actionContext)}
          >
            {ActionIcon ? <ActionIcon sx={styles.menuItemIcon} /> : null}

            {actionConfig.label}
          </MenuItem>
        );
      })}
    </MenuTooltip>
  );
});

export default StoryId;
