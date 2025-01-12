import type { StoryOrSummary } from '../types';

export const isStoryArchived = (story: StoryOrSummary) => story.status === 'ARCHIVED';

export const isStoryDraft = (story: StoryOrSummary) => story.status === 'DRAFT';

export const isStoryPreviewing = (story: StoryOrSummary) => story.status === 'PREVIEW';

export const isStoryPublished = (story: StoryOrSummary) => story.status === 'PUBLISHED';
