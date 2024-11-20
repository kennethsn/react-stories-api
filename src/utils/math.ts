export const getRandomNumber = (min: number, max: number) => (
  Math.floor(Math.random() * (max - min + 1)) + min
);

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
