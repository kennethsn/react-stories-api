import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import type { GoToOptions, StoriesAPIFormatters } from '../types';
import { formatString } from '../utils/string';
import { getPathFormatter, goToURL, openNewTab } from '../utils/url';
import useStoriesAPI from './useStoriesAPI';

// TODO: move to store
const buildGoToFn = (
  getPath: (to: GoToOptions) => string,
  goToPath: (path: string) => void,
) => (to: GoToOptions) => {
  const { new_tab: newTab } = to;
  if ('url' in to) {
    return goToURL(to.url, newTab, goToPath);
  }
  const path = getPath(to);
  return newTab ? openNewTab(path) : goToPath(path);
};

const buildGetPathFn = (formatters: StoriesAPIFormatters) => (to: GoToOptions) => {
  const formatter = getPathFormatter(to, formatters);
  return formatString(formatter, to);
};

export default function useStoriesAPINavigation() {
  const storiesAPI = useStoriesAPI();
  const navigate = useNavigate();
  const goToPathFn = storiesAPI.goToPath ?? navigate;
  const getPathFn = buildGetPathFn(storiesAPI.formatters.formatters);

  return useMemo(() => ({
    goTo: buildGoToFn(getPathFn, goToPathFn),
    goToPath: goToPathFn,
    getPath: getPathFn,
  }), [goToPathFn, getPathFn]);
}
