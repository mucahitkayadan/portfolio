import { useEffect, useRef, useState } from 'react';

interface UseInViewCanvasOptions {
  rootMargin?: string;
  threshold?: number;
}

const useInViewCanvas = (options: UseInViewCanvasOptions = {}) => {
  const { rootMargin = '100px', threshold = 0 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin,
      threshold,
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return { ref, inView };
};

export default useInViewCanvas;
