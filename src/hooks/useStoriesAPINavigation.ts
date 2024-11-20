import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import type { GoToOptions, StoriesAPIFormatters } from '../types';
import { goToURL, openNewTab } from '../utils';
import { formatString } from '../utils/string';
import useStoriesAPI from './useStoriesAPI';

const buildGoToFn = (
  goToPath: (path: string) => void,
  formatters: StoriesAPIFormatters,
) => (to: GoToOptions) => {
  const { newTab } = to;
  if ('url' in to) {
    return goToURL(to.url, newTab, goToPath);
  }
  let formatter = formatters.collectionPath;
  if ('moment' in to) {
    formatter = formatters.momentPath;
  } else if (to.storyId) {
    formatter = formatters.storyPath;
  }
  const path = formatString(formatter, to);
  return newTab ? openNewTab(path) : goToPath(path);
};

export default function useStoriesAPINavigation() {
  const { formatters, goToPath } = useStoriesAPI();
  const navigate = useNavigate();
  const goToPathFn = goToPath ?? navigate;

  return useMemo(() => ({
    goTo: buildGoToFn(goToPathFn, formatters),
    goToPath: goToPathFn,
  }), [formatters, goToPathFn]);
}
