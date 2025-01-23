/* eslint-disable no-param-reassign */
export const deepMerge = <T>(objectA?: T, objectB?: T | Partial<T>): T => (
  (objectA && objectB) ? Object
    .keys(objectB as object)
    .reduce((mergedObject, objectKey) => {
      const key = objectKey as keyof T;
      const valueA = objectA[key];
      const valueB = objectB[key];
      if (valueA && typeof valueB === 'object' && !Array.isArray(valueB)) {
        mergedObject[key] = deepMerge(valueA, valueB) as never;
      } else {
        mergedObject[key] = valueB as never;
      }
      return mergedObject;
    }, { ...objectA }) : (objectA || objectB)) as T;

export const objectMap = <T, Q=T>(
  obj: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (key: string, value: any) => unknown,
) => Object.fromEntries(
    Object.entries(obj as object).map(
      ([key, value]) => [key, fn(key, value)],
    ),
  ) as Q;
