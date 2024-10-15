import { type CSSProperties, useRef } from 'react';

import animationConfig from '../../../configs/animationConfig';
import { useElementIsVisible } from '../../../hooks';
import type { AnimationProps } from './Animation.types';

export default function Animation({ children, ...props }: AnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const elementIsVisible = useElementIsVisible(ref);
  const animation = 'animation' in props ? animationConfig[props.animation] : props;
  const animationStyles = elementIsVisible ? animation.to : animation.from;
  const style: CSSProperties = {
    transition: '600ms ease-in-out',
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
