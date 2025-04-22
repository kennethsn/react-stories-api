import { useHref, useNavigate } from 'react-router-dom';

import type { GoToOptions, StoriesAPIFormatters } from '../types';
import { formatString } from '../utils/string';
import { getPathFormatter, goToURL, openNewTab } from '../utils/url';
import useStoriesAPI from './useStoriesAPI';

const getPath = (to: GoToOptions, formatters: StoriesAPIFormatters) => {
  const formatter = getPathFormatter(to, formatters);
  const path = formatString(formatter, to);
  return path;
};

export default function useStoriesAPINavigation(to: GoToOptions) {
  const { new_tab: newTab } = to;
  const storiesAPI = useStoriesAPI();
  const navigate = useNavigate();

  const toPath = getPath(to, storiesAPI.formatters.formatters);
  const href = useHref(toPath);
  const path = newTab ? href : toPath;
  const goTo = () => {
    const goToPathFn = storiesAPI.goToPath ?? navigate;
    if ('url' in to) {
      return goToURL(to.url, newTab, goToPathFn);
    }
    if (newTab) {
      return openNewTab(path);
    }
    return goToPathFn(path);
  };
  return {
    goTo,
    path,
  };
}
