export const addQueryParams = (url: string, params: Record<string, string | undefined>): string => {
  const urlObj = new URL(url);
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;
    urlObj.searchParams.append(key, value);
  });
  return urlObj.toString();
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
