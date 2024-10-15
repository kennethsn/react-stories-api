import type { CSSProperties } from 'react';

import animationConfig from '../../../configs/animationConfig';

export type AnimationProps = { readonly children: React.ReactNode } & ({
  readonly animation: keyof typeof animationConfig;
} | {
  readonly from: CSSProperties;
  readonly to: CSSProperties
});
