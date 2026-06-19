"use client";

import { useState, useEffect } from "react";
import { Share2, Plus, X, Copy, Check, MessageCircle, Sparkles } from "lucide-react";

export default function SocialShare({ title = "Surah Yaseen Web Platform", text = "Read and listen to Surah Yaseen with translation and phonics online!" }) {
  const [shareUrl, setShareUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      setIsModalOpen(true);
    }
  };

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: <MessageCircle className="w-4 h-4 fill-current" />,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + shareUrl)}`,
      color: "bg-[#25D366] hover:bg-[#25D366]/80 text-real-white",
    },
    {
      name: "Twitter",
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`,
      color: "bg-[#1DA1F2] hover:bg-[#1DA1F2]/80 text-real-white",
    },
    {
      name: "Facebook",
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: "bg-[#1877F2] hover:bg-[#1877F2]/80 text-real-white",
    },
    {
      name: "Pinterest",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.41 7.61 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.886 1.406-5.886s-.359-.714-.359-1.774c0-1.662.967-2.902 2.167-2.902 1.02 0 1.513.763 1.513 1.678 0 1.025-.652 2.561-.99 3.978-.283 1.187.593 2.155 1.764 2.155 2.119 0 3.748-2.232 3.748-5.454 0-2.852-2.049-4.847-4.979-4.847-3.398 0-5.393 2.544-5.393 5.178 0 1.024.394 2.124.887 2.723a.364.364 0 0 1 .082.343c-.097.404-.315 1.285-.357 1.464-.055.234-.182.285-.419.176-1.564-.725-2.544-3.003-2.544-4.829 0-3.928 2.855-7.537 8.232-7.537 4.321 0 7.68 3.078 7.68 7.199 0 4.29-2.705 7.747-6.46 7.747-1.262 0-2.449-.656-2.855-1.433 0 0-.624 2.378-.775 2.962-.28.1.077-.102.3-.64 2.455-1.127 1.435-5.962 1.435-9.453 0-6.196-8.961-6.04-8.961.12 0 1.979.775 3.328 1.908 3.328 1.125 0 2.036-.93 2.036-2.072 0-1.364-.473-2.316-.948-3.232C12.014 24 12.017 24 12.017 0z" />
        </svg>
      ),
      url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(text)}`,
      color: "bg-[#E60023] hover:bg-[#E60023]/80 text-real-white",
    },
  ];

  return (
    <>
      {/* Floating Share Drawer */}
      <div className="fixed left-6 bottom-6 z-40 no-print flex flex-col items-center">
        <div className="flex items-center bg-dark-green border border-caribbean-green/20 rounded-full shadow-2xl p-1.5 gap-1.5 animate-in slide-in-from-left duration-300">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 ${link.color}`}
              title={`Share on ${link.name}`}
            >
              {link.icon}
            </a>
          ))}
          <button
            onClick={handleNativeShare}
            className="w-9 h-9 rounded-full bg-bangladesh-green hover:bg-caribbean-green text-real-white hover:text-rich-black flex items-center justify-center transition-all duration-300 transform hover:scale-105"
            title="More sharing options"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Expanded Modal Sheet */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rich-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-dark-green border border-caribbean-green/30 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-real-white hover:bg-rich-black/40 p-1.5 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-6">
              <Share2 className="w-5 h-5 text-caribbean-green animate-pulse" />
              <h3 className="text-lg font-bold text-pure-white font-sans">Share this Page</h3>
            </div>

            <p className="text-sm text-gray-300 mb-6 leading-relaxed font-sans">
              Copy the web link below or trigger native OS sharing tools to spread blessings with family and friends:
            </p>

            {/* Link Copy Bar */}
            <div className="flex items-center bg-rich-black border border-caribbean-green/10 rounded-xl p-2 mb-6 gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="bg-transparent text-sm text-gray-300 w-full focus:outline-none px-2 select-all"
              />
              <button
                onClick={handleCopyLink}
                className="flex items-center justify-center bg-bangladesh-green hover:bg-caribbean-green hover:text-rich-black text-real-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 gap-1"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </>
                )}
              </button>
            </div>

            {/* Native fallback button */}
            <button
              onClick={async () => {
                if (navigator.share) {
                  await navigator.share({
                    title,
                    text,
                    url: shareUrl,
                  });
                  setIsModalOpen(false);
                } else {
                  handleCopyLink();
                }
              }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-bangladesh-green to-caribbean-green hover:opacity-90 text-real-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-caribbean-green/10 transition-all font-sans"
            >
              <Sparkles className="w-4 h-4 text-real-white" />
              Open System Share Dialog
            </button>
          </div>
        </div>
      )}
    </>
  );
}
