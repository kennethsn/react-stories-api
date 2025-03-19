import type { SerializableRecord } from '../types';

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

export const objectsAreEqual = <T=object>(obj1: T, obj2: T): boolean => {
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
    return obj1 === obj2;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  return keys1.every((key) => (
    objectsAreEqual((obj1 as Record<string, unknown>)[key], (obj2 as Record<string, unknown>)[key])
  ));
};

export const updateObject = (
  object: SerializableRecord,
  fieldPath: string,
  value: SerializableRecord[keyof SerializableRecord],
) => {
  const fields = fieldPath.split('.');
  let current = object;
  for (let i = 0; i < fields.length - 1; i += 1) {
    if (!current?.[fields[i]]) {
      current[fields[i]] = {};
    }
    current = current[fields[i]] as SerializableRecord;
  }

  current[fields[fields.length - 1]] = value;
};
