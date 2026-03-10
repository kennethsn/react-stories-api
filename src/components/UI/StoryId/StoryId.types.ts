import type { TypographyProps } from '@mui/material/Typography';

import type {
  StoryIdAction,
  StoryIdActionConfig,
  StoryIdActionContext,
  StoryIdActionDefinition,
  StoryOrSummary,
} from '../../../types';

export type { StoryIdAction };

export type BuiltInStoryIdAction = 'clipboard' | 'external-link' | 'story';

export type StoryIdActionMapParams = {
  readonly hasExternalUrl: boolean;
  readonly onCopyToClipboard: () => void | Promise<void>;
  readonly onGoToExternal: () => void;
  readonly onGoToStory: () => void;
  readonly t: (key: string) => string;
};

export type StoryIdEnabledActionsParams = {
  readonly actionMap: Record<BuiltInStoryIdAction, StoryIdActionConfig>;
  readonly actions: StoryIdAction[];
  readonly context: StoryIdActionContext;
  readonly customActionMap: Record<string, StoryIdActionDefinition>;
};

export type StoryIdResolveActionParams = {
  readonly actionMap: Record<BuiltInStoryIdAction, StoryIdActionConfig>;
  readonly customActionMap: Record<string, StoryIdActionDefinition>;
};

export type StoryIdProps = Omit<TypographyProps, 'children'> & {
  /**
   * Actions to display in the menu. Defaults to all available actions.
   */
  readonly actions?: StoryIdAction[];
  /**
   * Optional external URL for the "Go to external site" action
   */
  readonly externalUrl?: string;
  /**
   * The story or story summary object
   */
  readonly story: StoryOrSummary;
};
