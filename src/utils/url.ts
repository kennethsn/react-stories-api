import type { GoToOptions, GoToPathFn, StoriesAPIFormatters } from '../types';
import { strip } from './string';

export type QueryParams = Record<string, number | string | string[] | boolean | undefined>;

export const addQueryParams = (
  url: string,
  params: QueryParams,
): string => {
  const urlObj = new URL(url);
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;
    urlObj.searchParams.append(key, value as string);
  });
  return urlObj.toString();
};

export const buildURL = (baseURL: string, path?: string, queryParams?: QueryParams) => {
  const url = `${baseURL}${path ?? ''}`;
  if (queryParams) return addQueryParams(url, queryParams);
  return url;
};

export const getBaseURL = (url?: string): string => {
  if (!url) return window.location.origin;
  const urlObj = new URL(url);
  return urlObj.origin;
};

export const getPath = (url: string): string => {
  const baseURL = getBaseURL(url);
  return strip(url, baseURL);
};

export const getPathFormatter = (to: GoToOptions, formatters: StoriesAPIFormatters) => {
  if (to.formatter) {
    return to.formatter;
  }
  if ('momentId' in to) {
    return formatters.momentPath;
  } if ('storyId' in to) {
    return formatters.storyPath;
  }
  return formatters.collectionPath;
};

export const getQueryParam = (url: string, key: string): string | null | undefined => {
  const urlObj = new URL(url);
  return urlObj.searchParams.get(key);
};

export const getQueryParams = (url: string): Record<string, string> => {
  const urlObj = new URL(url);
  const params = Object.fromEntries(urlObj.searchParams.entries());
  return params;
};
export const goToExternalURL = (url: string, newTab?: boolean): void => {
  if (newTab) {
    return openNewTab(url);
  }
  window.location.href = url;
  return undefined;
};

export const goToURL = (pathOrURL: string, newTab?: boolean, goToPath?: GoToPathFn): void => {
  if (newTab || !goToPath || isExternalURL(pathOrURL)) {
    return goToExternalURL(pathOrURL, newTab);
  }
  const path = isURL(pathOrURL) ? getPath(pathOrURL) : pathOrURL;
  return goToPath(path);
};

export const isExternalURL = (url: string): boolean => isURL(url) && !isInternalURL(url);

export const isInternalURL = (url: string): boolean => getBaseURL(url) === getBaseURL();

export const isURL = (url: string): boolean => {
  try {
    return !!new URL(url);
  } catch {
    return false;
  }
};

export const openJSON = (json: Record<string, unknown>) => {
  const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
  URL.revokeObjectURL(url);
};

export const openNewTab = (url: string): void => {
  window.open(url, '_blank');
};

export const stripTrailingSlash = (url: string): string => url.replace(/\/+$/, '');
