import { type RefObject, useEffect, useState } from 'react';

export default function useElementIsVisible(ref: RefObject<Element>, rootMargin = '0px') {
  const [isIntersecting, setIsIntersecting] = useState(true);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
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
