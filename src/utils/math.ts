export const getRelativeValue = (
  target: number,
  value: number,
  algorithm: 'absolute' | 'percentage' = 'percentage',
) => {
  if (algorithm === 'absolute') {
    return target - value;
  }
  return Math.floor(target * value);
};

export default { getRelativeValue };
