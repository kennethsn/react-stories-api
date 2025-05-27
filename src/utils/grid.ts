import { GRID_MAX_SIZE } from '../constants';
import { objectMap } from './object';

export type GridColumns = {
  lg: number;
  md: number;
  sm: number;
  xs: number;
};

export const buildDynamicGridColumns = (
  itemsCount: number,
  defaults?: Partial<GridColumns> | undefined,
) => ({
  lg: getNumberOfColumns(itemsCount, defaults?.lg ?? 4),
  md: getNumberOfColumns(itemsCount, defaults?.md ?? 3),
  sm: getNumberOfColumns(itemsCount, defaults?.sm ?? 2),
  xs: defaults?.xs ?? 1,
});

export const buildDynamicGridSize = (itemsCount: number) => objectMap(
  buildDynamicGridColumns(itemsCount),
  (_, columnCount: number) => columnCountToSize(columnCount),
);

export const columnCountToSize = (columnCount: number) => GRID_MAX_SIZE / columnCount;

export const getNumberOfColumns = (itemsCount: number, rowMax: number): number => {
  if (itemsCount < rowMax) {
    return getNumberOfColumns(itemsCount, itemsCount);
  }
  return rowMax;
};
