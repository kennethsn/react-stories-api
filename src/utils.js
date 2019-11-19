export function classList(...classes) {
  return classes
    .filter(item => !!item)
    .join(' ');
}
