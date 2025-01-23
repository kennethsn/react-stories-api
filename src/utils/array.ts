export const buildMap = <T>(array: T[], key = 'id'): Record<string, T> => array.reduce((acc, item) => {
  acc[item[key as keyof T] as string] = item;
  return acc;
}, {} as Record<string, T>);

export const filterExists = <T>(array: T[]): T[] => array.filter(Boolean);
