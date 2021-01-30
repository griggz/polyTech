import React, { useState, useEffect } from "react";

export default function useScroll() {
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    let requestRunning = null;
    function handleScroll() {
      if (requestRunning === null) {
        requestRunning = window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          setScrolled(scrolled);
          requestRunning = null;
        });
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrolled;
}
