import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

function isGalleryRoute(pathname: string) {
  return pathname === "/" || pathname.startsWith("/gallery/");
}

export function ScrollToTop() {
  const [location] = useLocation();
  const prevLocation = useRef<string | null>(null);

  useEffect(() => {
    const prev = prevLocation.current;
    prevLocation.current = location;

    // Opening/closing a painting (/ <-> /gallery/:id) is the same page —
    // don't reset scroll position when staying within that family of routes.
    if (prev !== null && isGalleryRoute(prev) && isGalleryRoute(location)) {
      return;
    }

    const hash = window.location.hash;

    if (hash) {
      // Wait a tick for the new page to render before measuring its layout
      requestAnimationFrame(() => {
        const el = document.querySelector(hash);
        if (el) {
          const navbarOffset = 96; // roughly the fixed navbar's height
          const top = el.getBoundingClientRect().top + window.scrollY - navbarOffset;
          window.scrollTo({ top, behavior: "smooth" });
          return;
        }
        window.scrollTo(0, 0);
      });
      return;
    }

    window.scrollTo(0, 0);
  }, [location]);

  return null;
}