import { type RefObject, useEffect, useState } from 'react';

type Options = {
  readonly persist?: boolean;
  readonly rootMargin?: string;
};

export default function useElementIsVisible(ref: RefObject<Element>, { persist, rootMargin = '0px' }: Options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const timer = setTimeout(() => {
      const createdObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (persist) {
              createdObserver.disconnect();
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
      observer = createdObserver;
      const { current } = ref;
      if (current) {
        createdObserver.observe(current);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [persist, ref, rootMargin]);

  return isIntersecting;
}
