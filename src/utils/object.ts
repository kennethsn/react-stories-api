/* eslint-disable no-param-reassign */
export const deepMerge = <T>(objectA: T, objectB: T): T => Object
  .keys(objectB as object)
  .reduce((mergedObject, objectKey) => {
    const key = objectKey as keyof T;
    const valueA = objectA[key];
    const valueB = objectB[key];
    if (valueA && typeof valueB === 'object' && !Array.isArray(valueB)) {
      mergedObject[key] = deepMerge(valueA, valueB);
    } else {
      mergedObject[key] = valueB;
    }
    return mergedObject;
  }, { ...objectA });

export default deepMerge;
