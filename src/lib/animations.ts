"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Check for reduced motion preference
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Hook for fade-in animation on scroll
export function useFadeIn(delay: number = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;

    const element = ref.current;
    
    gsap.set(element, { opacity: 0, y: 30 });
    
    const animation = gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === element) t.kill();
      });
    };
  }, [delay]);

  return ref;
}

// Hook for staggered children animation
export function useStaggerChildren(staggerDelay: number = 0.1) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;

    const element = ref.current;
    const children = element.children;
    
    gsap.set(children, { opacity: 0, y: 20 });
    
    const animation = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: staggerDelay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === element) t.kill();
      });
    };
  }, [staggerDelay]);

  return ref;
}

// Hook for hero animation (plays immediately)
export function useHeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    const container = containerRef.current;
    const elements = {
      badge: container.querySelector("[data-hero-badge]"),
      title: container.querySelector("[data-hero-title]"),
      subtitle: container.querySelector("[data-hero-subtitle]"),
      ctas: container.querySelector("[data-hero-ctas]"),
      trust: container.querySelector("[data-hero-trust]"),
    };

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Set initial states
    Object.values(elements).forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, y: 20 });
    });

    // Animate in sequence
    tl.to(elements.badge, { opacity: 1, y: 0, duration: 0.5 }, 0.2)
      .to(elements.title, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
      .to(elements.subtitle, { opacity: 1, y: 0, duration: 0.5 }, 0.6)
      .to(elements.ctas, { opacity: 1, y: 0, duration: 0.5 }, 0.8)
      .to(elements.trust, { opacity: 1, y: 0, duration: 0.5 }, 1);

    return () => {
      tl.kill();
    };
  }, []);

  return containerRef;
}

// Hook for counter animation
export function useCountUp(
  endValue: number,
  duration: number = 2,
  suffix: string = ""
) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current || hasAnimated.current) {
      if (ref.current) {
        ref.current.textContent = `${endValue.toLocaleString()}${suffix}`;
      }
      return;
    }

    const element = ref.current;
    
    ScrollTrigger.create({
      trigger: element,
      start: "top 85%",
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        
        gsap.to(
          { value: 0 },
          {
            value: endValue,
            duration,
            ease: "power2.out",
            onUpdate: function () {
              if (element) {
                element.textContent = `${Math.round(this.targets()[0].value).toLocaleString()}${suffix}`;
              }
            },
          }
        );
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === element) t.kill();
      });
    };
  }, [endValue, duration, suffix]);

  return ref;
}
