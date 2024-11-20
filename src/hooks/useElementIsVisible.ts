import { type RefObject, useEffect, useState } from 'react';

type Options = {
  readonly persist?: boolean;
  readonly rootMargin?: string;
};

export default function useElementIsVisible(ref: RefObject<Element>, { persist, rootMargin = '0px' }: Options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (persist && isIntersecting) {
          return;
        }
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin },
    );
    const { current } = ref;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  });

  return isIntersecting;
}
