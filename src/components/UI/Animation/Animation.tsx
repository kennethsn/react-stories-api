import { type CSSProperties, useRef } from 'react';

import animationConfig from '../../../configs/animationConfig';
import { useElementIsVisible } from '../../../hooks';
import type { AnimationProps } from './Animation.types';

export default function Animation({
  children,
  persist,
  speed = 600,
  ...props
}: AnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const elementIsVisible = useElementIsVisible(ref, { persist });
  const animation = 'animation' in props ? animationConfig[props.animation] : props;
  const animationStyles = elementIsVisible ? animation.to : animation.from;
  const style: CSSProperties = {
    willChange: 'transform, opacity',
    transition: `${speed}ms ease-in-out`,
    ...animationStyles,
  };
  return (
    <div
      ref={ref}
      style={style}
    >
      {children}
    </div>
  );
}
