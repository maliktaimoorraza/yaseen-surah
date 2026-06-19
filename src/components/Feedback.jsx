"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, Smile } from "lucide-react";

export default function Feedback() {
  const [response, setResponse] = useState(null); // 'yes', 'no', or null

  const handleFeedback = (type) => {
    setResponse(type);
  };

  return (
    <div className="bg-dark-green/30 border border-caribbean-green/10 rounded-2xl p-6 text-center no-print my-12 animate-in fade-in duration-300">
      {response === null ? (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <span className="text-sm font-medium text-gray-300 font-sans">
            Was this guide helpful?
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleFeedback("yes")}
              className="flex items-center gap-2 bg-dark-green hover:bg-bangladesh-green border border-caribbean-green/20 hover:border-caribbean-green/50 text-gray-300 hover:text-real-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 group"
            >
              <ThumbsUp className="w-4 h-4 text-caribbean-green group-hover:text-real-white transition-transform group-hover:-translate-y-0.5 duration-300" />
              <span>Yes, thanks</span>
            </button>
            <button
              onClick={() => handleFeedback("no")}
              className="flex items-center gap-2 bg-dark-green hover:bg-red-950/40 border border-caribbean-green/20 hover:border-red-800/40 text-gray-300 hover:text-real-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 group"
            >
              <ThumbsDown className="w-4 h-4 text-red-400 group-hover:text-real-white transition-transform group-hover:translate-y-0.5 duration-300" />
              <span>No, not really</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2.5 text-caribbean-green text-sm font-medium font-sans animate-in zoom-in-95 duration-300">
          <Smile className="w-5 h-5 text-caribbean-green animate-bounce" />
          <span>
            {response === "yes" 
              ? "JazakAllahu Khairan! Thank you for your feedback." 
              : "Thank you for your feedback. We will work to improve this guide!"}
          </span>
        </div>
      )}
    </div>
  );
}
