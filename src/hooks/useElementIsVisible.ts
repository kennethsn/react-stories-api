import { type RefObject, useEffect, useState } from 'react';

type Options = {
  readonly persist?: boolean;
  readonly rootMargin?: string;
};

export default function useElementIsVisible(ref: RefObject<Element>, { persist, rootMargin = '0px' }: Options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (persist) {
              observer.disconnect();
            }
            setIsIntersecting(true);
            return;
          }
          if (persist && !entry.isIntersecting) {
            return;
          }
          setIsIntersecting(false);
        },
        { rootMargin },
      );
      const { current } = ref;
      if (current) {
        observer.observe(current);
      }
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  });

  return isIntersecting;
}
