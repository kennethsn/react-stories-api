import type { TypographyBadgeProps } from '../TypographyBadge/TypographyBadge.types';

export type ContainerBadgeProps = TypographyBadgeProps & {
  readonly direction?: 'left' | 'right';
  readonly offset?: number;
};
