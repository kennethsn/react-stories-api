import BookIcon from '@mui/icons-material/Book';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LaunchIcon from '@mui/icons-material/Launch';

import type {
  StoryIdActionConfig,
  StoryIdActionContext,
  StoryIdActionPlugin,
  StoryIdCustomAction,
} from '../../../types';
import type {
  BuiltInStoryIdAction,
  StoryIdAction,
  StoryIdActionMapParams,
  StoryIdEnabledActionsParams,
  StoryIdResolveActionParams,
} from './StoryId.types';

export const builtInStoryIdActions: BuiltInStoryIdAction[] = [
  'story',
  'external-link',
  'clipboard',
];

export const buildStoryIdActionMap = ({
  t,
  hasExternalUrl,
  onCopyToClipboard,
  onGoToExternal,
  onGoToStory,
}: StoryIdActionMapParams): Record<BuiltInStoryIdAction, StoryIdActionConfig> => {
  const actionMap: Record<BuiltInStoryIdAction, StoryIdActionConfig> = {
    clipboard: {
      icon: ContentCopyIcon,
      label: t('storyId.actions.clipboard'),
      name: 'clipboard',
      onClick: onCopyToClipboard,
    },
    'external-link': {
      disabled: !hasExternalUrl,
      icon: LaunchIcon,
      label: t('storyId.actions.externalLink'),
      name: 'external-link',
      onClick: onGoToExternal,
    },
    story: {
      icon: BookIcon,
      label: t('storyId.actions.story'),
      name: 'story',
      onClick: onGoToStory,
    },
  };

  return actionMap;
};

export const getEnabledStoryIdActions = ({
  actions,
  actionMap,
  customActionMap,
  context,
}: StoryIdEnabledActionsParams): Array<StoryIdActionConfig | StoryIdCustomAction> => (
  actions
    .map((action) => resolveStoryIdAction(action, { actionMap, customActionMap }))
    .filter((actionConfig): actionConfig is StoryIdActionConfig | StoryIdCustomAction => (
      !!actionConfig
      && isStoryIdActionVisible(actionConfig, context)
      && !isStoryIdActionDisabled(actionConfig, context)
    ))
);

export const getStoryIdActions = (
  actionsProp: StoryIdAction[] | undefined,
  customActionMap: Record<string, StoryIdActionPlugin>,
): StoryIdAction[] => (
  actionsProp
  || ([
    ...builtInStoryIdActions,
    ...Object.keys(customActionMap),
  ] as StoryIdAction[])
);

export const isBuiltInStoryIdAction = (
  value: StoryIdAction,
): value is BuiltInStoryIdAction => (
  builtInStoryIdActions.includes(value as BuiltInStoryIdAction)
);

export const isStoryIdActionDisabled = (
  actionConfig: StoryIdActionPlugin | undefined,
  context: StoryIdActionContext,
): boolean => {
  if (!actionConfig) return true;
  if (typeof actionConfig.disabled === 'function') {
    return actionConfig.disabled(context);
  }
  return actionConfig.disabled ?? false;
};

export const isStoryIdActionVisible = (
  actionConfig: StoryIdActionPlugin | undefined,
  context: StoryIdActionContext,
): boolean => {
  if (!actionConfig) return false;
  if (typeof actionConfig.visible === 'function') {
    return actionConfig.visible(context);
  }
  return actionConfig.visible ?? true;
};

export const resolveStoryIdAction = (
  action: StoryIdAction,
  { actionMap, customActionMap }: StoryIdResolveActionParams,
): StoryIdCustomAction | StoryIdActionConfig | undefined => {
  if (typeof action !== 'string') {
    return action;
  }
  if (isBuiltInStoryIdAction(action)) {
    return actionMap[action];
  }
  const customAction = customActionMap[action];
  return customAction ? { ...customAction, name: action } : undefined;
};
