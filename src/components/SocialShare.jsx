"use client";

import { useEffect } from "react";

export default function SocialShare() {
  useEffect(() => {
    // Re-initialize AddToAny on mount/routing to scan the DOM for button elements
    if (window.a2a) {
      window.a2a.init_all();
    }
  }, []);

  return (
    <>
      {/* Desktop Vertical Floating Share Bar (Left Side) */}
      <div className="hidden md:flex fixed top-1/2 -translate-y-1/2 left-4 z-40 no-print flex-col items-center">
        <div 
          className="a2a_kit a2a_kit_size_32 flex flex-col gap-2.5 bg-dark-green/90 border border-caribbean-green/20 rounded-full shadow-2xl p-2.5 animate-in slide-in-from-left duration-300"
        >
          <a className="a2a_button_facebook !block transition-transform hover:scale-110 duration-200"></a>
          <a className="a2a_button_twitter !block transition-transform hover:scale-110 duration-200"></a>
          <a className="a2a_button_whatsapp !block transition-transform hover:scale-110 duration-200"></a>
          <a className="a2a_button_pinterest !block transition-transform hover:scale-110 duration-200"></a>
          <a className="a2a_dd !block transition-transform hover:scale-110 duration-200" href="https://www.addtoany.com/share"></a>
        </div>
      </div>

      {/* Mobile Horizontal Floating Share Bar (Bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 no-print">
        <div 
          className="a2a_kit a2a_kit_size_32 flex justify-around items-center bg-dark-green/95 border-t border-caribbean-green/25 shadow-2xl px-4 py-2.5"
        >
          <a className="a2a_button_facebook transition-transform hover:scale-110 duration-200"></a>
          <a className="a2a_button_twitter transition-transform hover:scale-110 duration-200"></a>
          <a className="a2a_button_whatsapp transition-transform hover:scale-110 duration-200"></a>
          <a className="a2a_button_pinterest transition-transform hover:scale-110 duration-200"></a>
          <a className="a2a_dd transition-transform hover:scale-110 duration-200" href="https://www.addtoany.com/share"></a>
        </div>
      </div>
    </>
  );
}
