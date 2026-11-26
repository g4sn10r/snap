import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

/**
 * Scroll-triggered reveal animation hook using IntersectionObserver
 * - Elements start hidden (opacity: 0, translateY(18px) scale(0.94))
 * - Animate in with impact curve (cubic-bezier(0.22, 1, 0.36, 1))
 * - Respects prefers-reduced-motion
 * - Elements already in viewport on load are shown immediately
 * - once: true - animation only triggers once
 */
export function useScrollReveal(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    delay = 0,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);
  const observerRef = useRef(null);
  const optionsRef = useRef({ threshold, rootMargin, triggerOnce, delay });

  // Keep options ref current without triggering re-renders
  useEffect(() => {
    optionsRef.current = { threshold, rootMargin, triggerOnce, delay };
  }, [threshold, rootMargin, triggerOnce, delay]);

  // Check prefers-reduced-motion
  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const setRef = useCallback((node) => {
    elementRef.current = node;
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const opts = optionsRef.current;

    // If prefers-reduced-motion, show immediately
    if (prefersReducedMotion.current) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    // Check if element is already in viewport (above fold or scrolled into view)
    const rect = element.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInViewport) {
      // Element already visible - show immediately with optional delay
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasAnimated(true);
      }, opts.delay);
      return () => clearTimeout(timer);
    }

    // Set up IntersectionObserver for scroll-triggered reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const timer = setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, opts.delay);
            if (opts.triggerOnce) {
              observer.unobserve(element);
            }
            return () => clearTimeout(timer);
          } else if (!opts.triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      { threshold: opts.threshold, rootMargin: opts.rootMargin }
    );

    observer.observe(element);
    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, []); // Empty deps - options read from ref, element from ref

  return { ref: setRef, isVisible, hasAnimated };
}

/**
 * Staggered scroll reveal for multiple elements
 * Returns array of refs and visibility states
 */
export function useStaggeredScrollReveal(count, options = {}) {
  const { stagger = 60, ...restOptions } = options;

  // Use refs for element storage (no re-renders on ref assignment)
  const elementRefs = useRef(new Array(count).fill(null));
  const observerRefs = useRef(new Array(count).fill(null));
  const optionsRef = useRef({ stagger, ...restOptions });

  // Keep options ref current
  useEffect(() => {
    optionsRef.current = { stagger, ...restOptions };
  }, [stagger, restOptions.threshold, restOptions.rootMargin, restOptions.triggerOnce]);

  const [visibilities, setVisibilities] = useState(new Array(count).fill(false));
  const [hasAnimated, setHasAnimated] = useState(new Array(count).fill(false));

  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Stable setter for refs - doesn't trigger re-render
  const setRef = useCallback((index) => (node) => {
    elementRefs.current[index] = node;
  }, []);

  // Set up observers - only runs once on mount and when count changes
  useEffect(() => {
    const opts = optionsRef.current;

    if (prefersReducedMotion.current) {
      setVisibilities(new Array(count).fill(true));
      setHasAnimated(new Array(count).fill(true));
      return;
    }

    const observers = [];
    let mounted = true;

    elementRefs.current.forEach((element, index) => {
      if (!element || index >= count) return;

      // Check if already in viewport
      const rect = element.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInViewport) {
        const timer = setTimeout(() => {
          if (!mounted) return;
          setVisibilities(prev => {
            const next = [...prev];
            next[index] = true;
            return next;
          });
          setHasAnimated(prev => {
            const next = [...prev];
            next[index] = true;
            return next;
          });
        }, index * opts.stagger);
        return () => clearTimeout(timer);
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const timer = setTimeout(() => {
                if (!mounted) return;
                setVisibilities(prev => {
                  const next = [...prev];
                  next[index] = true;
                  return next;
                });
                setHasAnimated(prev => {
                  const next = [...prev];
                  next[index] = true;
                  return next;
                });
              }, index * opts.stagger);
              if (opts.triggerOnce !== false) {
                observer.unobserve(element);
              }
              return () => clearTimeout(timer);
            } else if (opts.triggerOnce === false) {
              if (!mounted) return;
              setVisibilities(prev => {
                const next = [...prev];
                next[index] = false;
                return next;
              });
            }
          });
        },
        { threshold: opts.threshold || 0.1, rootMargin: opts.rootMargin || '0px 0px -50px 0px' }
      );

      observer.observe(element);
      observers.push(observer);
      observerRefs.current[index] = observer;
    });

    return () => {
      mounted = false;
      observers.forEach(obs => obs.disconnect());
    };
  }, [count]); // Only re-run when count changes

  return { refs: setRef, visibilities, hasAnimated };
}