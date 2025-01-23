import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import type { GoToOptions, StoriesAPIFormatters } from '../types';
import { goToURL, openNewTab } from '../utils';
import { formatString } from '../utils/string';
import useStoriesAPI from './useStoriesAPI';

// TODO: move to store
const buildGoToFn = (
  goToPath: (path: string) => void,
  formatters: StoriesAPIFormatters,
) => (to: GoToOptions) => {
  const { newTab } = to;
  if ('url' in to) {
    return goToURL(to.url, newTab, goToPath);
  }
  let formatter = formatters.collectionPath;
  if ('momentId' in to) {
    formatter = formatters.momentPath;
  } else if ('storyId' in to) {
    formatter = formatters.storyPath;
  }
  const path = formatString(formatter, to);
  return newTab ? openNewTab(path) : goToPath(path);
};

export default function useStoriesAPINavigation() {
  const storiesAPI = useStoriesAPI();
  const navigate = useNavigate();
  const goToPathFn = storiesAPI.goToPath ?? navigate;

  return useMemo(() => ({
    goTo: buildGoToFn(goToPathFn, storiesAPI.formatters.formatters),
    goToPath: goToPathFn,
  }), [storiesAPI.formatters.formatters, goToPathFn]);
}
