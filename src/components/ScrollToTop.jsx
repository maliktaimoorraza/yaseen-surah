"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="fixed bottom-36 right-6 md:bottom-6 z-50 no-print">
      <button
        onClick={scrollToTop}
        className={`w-12 h-12 rounded-full bg-caribbean-green hover:bg-caribbean-green/80 text-rich-black flex items-center justify-center shadow-lg shadow-caribbean-green/20 transition-all duration-300 transform border border-rich-black/20 ${
          isVisible 
            ? "translate-y-0 opacity-100 scale-100 pointer-events-auto" 
            : "translate-y-8 opacity-0 scale-75 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 stroke-[2.5]" />
      </button>
    </div>
  );
}
