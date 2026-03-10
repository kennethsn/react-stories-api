import { deepMerge } from '../../../utils/object';
import type { ContainerBadgeProps } from './ContainerBadge.types';

const styles = {
  root: ({
    direction = 'left',
    offset = 0,
    sx,
  }: ContainerBadgeProps) => deepMerge({
    m: direction === 'left' ? -offset : offset,
    position: 'absolute',
    right: direction === 'left' ? undefined : 0,
    zIndex: 1,
  }, sx),
};

export default styles;
