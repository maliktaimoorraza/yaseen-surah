"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Play, Pause, RotateCcw, HelpCircle, ChevronDown, User, Heart, Mic } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";
import SocialShare from "@/components/SocialShare";
import Feedback from "@/components/Feedback";

export default function RecitersPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [activePreview, setActivePreview] = useState(null); // 'sudais' or 'alafasy' or null
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(null); // 0 to 82

  const audioRef = useRef(null);
  const activePreviewRef = useRef(null);
  const isPlayingRef = useRef(false);
  const currentVerseIndexRef = useRef(null);

  const updateState = (preview, playing, index) => {
    activePreviewRef.current = preview;
    isPlayingRef.current = playing;
    currentVerseIndexRef.current = index;

    setActivePreview(preview);
    setIsPlaying(playing);
    setCurrentVerseIndex(index);
  };

  const playVerse = (index, reciter) => {
    if (!audioRef.current) return;

    const reciterPath = reciter === "alafasy"
      ? "Alafasy_64kbps"
      : "Abdurrahmaan_As-Sudais_64kbps";
    const verseNum = String(index + 1).padStart(3, "0");
    const audioUrl = `https://everyayah.com/data/${reciterPath}/036${verseNum}.mp3`;

    audioRef.current.src = audioUrl;
    audioRef.current.load();
    audioRef.current.play()
      .then(() => {
        // Playback successfully started
      })
      .catch((err) => {
        console.error("Audio playback failed:", err);
        updateState(null, false, null);
      });
  };

  // Initialize single Audio object on mount
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleEnded = () => {
      const rec = activePreviewRef.current;
      const idx = currentVerseIndexRef.current;
      if (rec && idx !== null && idx < 82) {
        const nextIndex = idx + 1;
        updateState(rec, true, nextIndex);
        playVerse(nextIndex, rec);
      } else {
        updateState(null, false, null);
      }
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePreview = (reciter) => {
    if (!audioRef.current) return;

    if (activePreviewRef.current === reciter) {
      if (isPlayingRef.current) {
        audioRef.current.pause();
        updateState(reciter, false, currentVerseIndexRef.current);
      } else {
        audioRef.current.play();
        updateState(reciter, true, currentVerseIndexRef.current);
      }
    } else {
      const startIndex = 0;
      updateState(reciter, true, startIndex);
      playVerse(startIndex, reciter);
    }
  };

  const stopPreview = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    updateState(null, false, null);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // FAQs - exact 35-to-50 words per answer
  const faqs = [
    {
      q: "What is the difference in recitation styles between Sudais and Alafasy?",
      a: "Sheikh Sudais utilizes a fast-paced, emotional recitation (hadar) with a high-pitched, resonant tone, bringing a sense of majesty. Sheikh Alafasy uses a slower, melodious pacing (tartil) with deep baritone control, emphasizing calm, measured reflection and precise phonics."
    },
    {
      q: "Can I download recitations of Surah Yaseen for offline use?",
      a: "Yes, you can easily download Surah Yaseen MP3 audio tracks directly from our platform. These files are sourced from public, verified databases such as EveryAyah and are optimized for quick client-side playback on mobile devices and desktop computers."
    },
    {
      q: "Are there copyrights on streaming these Surah Yaseen audios?",
      a: "The Quranic audio recordings streamed on our platform are distributed under open public domains for educational and non-commercial religious purposes. You are permitted to listen, stream, and share these files with others for spiritual benefit without copyright concerns."
    }
  ];

  return (
    <div className="min-h-screen bg-rich-black text-pure-white pb-12">
      {/* Intro Header Section */}
      <section className="relative py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="w-14 h-14 rounded-full bg-bangladesh-green/40 border border-caribbean-green/20 flex items-center justify-center mx-auto mb-4">
            <Mic className="w-7 h-7 text-caribbean-green" />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-caribbean-green font-semibold mb-3 inline-block">
            Tajweed & Vocal Artistry
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 font-sans">
            Surah Yaseen Reciters
          </h1>
          {/* Exactly 100 words Intro */}
          <p className="text-base text-gray-300 leading-relaxed font-sans">
            The art of classical Quranic recitation represents a sacred science governed by tajweed, which dictates the precise pronunciation, articulation points, and rhythmic duration of every Arabic syllable. Historically, distinct styles of recitation arose from classical scholars, each adding unique tonal characteristics while preserving scriptural integrity. In this modern era, prominent reciters have broadcast these traditions globally, inspiring millions. On this profile page, we analyze the biographies and unique vocal attributes of two globally acclaimed Quranic readers: Sheikh Qari Abdurrahmaan As-Sudais and Sheikh Mishary Rashid Alafasy, helping you understand their backgrounds, styles, and recorded works with absolute clarity right here online.
          </p>
        </div>
      </section>

      {/* Image Graphic Placeholder (Aspect-locked 1200px x 675px) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div id="reciters-banner" className="relative w-full aspect-[1200/675] max-w-[1200px] mx-auto rounded-3xl overflow-hidden shadow-2xl border border-caribbean-green/20 bg-gradient-to-tr from-dark-green via-rich-black to-dark-green flex flex-col justify-center items-center p-6 text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 font-arabic text-[9vw] select-none pointer-events-none">
            قرّاء سورة يس
          </div>
          <div className="relative z-10 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-bangladesh-green/30 border border-caribbean-green/20 flex items-center justify-center mx-auto mb-5">
              <Music className="w-8 h-8 text-caribbean-green" />
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white mb-2 font-sans">
              Biographies of Prominent Surah Yaseen Reciters
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto leading-relaxed mb-6">
              A detailed editorial review of Sheikh Qari Sudais and Sheikh Mishary Rashid Alafasy.
            </p>
            <div className="flex justify-center gap-3">
              <span className="text-[10px] bg-rich-black/75 px-4 py-2 rounded-full border border-caribbean-green/10 text-gray-300">
                Saudi Hadar style
              </span>
              <span className="text-[10px] bg-rich-black/75 px-4 py-2 rounded-full border border-caribbean-green/10 text-gray-300">
                Kuwaiti Tartil style
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Biographies Editorial Section (Exactly 200 words) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="glass-card rounded-3xl p-8 sm:p-10 border border-caribbean-green/10 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6 border-b border-caribbean-green/10 pb-4">
            <User className="w-5 h-5 text-caribbean-green" />
            <h2 className="text-xl font-bold text-white font-sans">
              Editorial Biographical Profiles
            </h2>
          </div>
          
          {/* Exact 200 words biographies */}
          <div className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans mb-8">
            <p>
              Sheikh Abdurrahmaan As-Sudais, the Chief Imam of the Grand Mosque in Makkah, Saudi Arabia, is globally celebrated for his high-pitched, emotional, and powerful style of recitation that moves millions to tears. Born in Riyadh, he memorized the Quran by age twelve and earned a doctorate in Islamic Sharia, utilizing his voice to lead congregational prayers and direct religious affairs with distinction. His recitation of Surah Yaseen features rapid, fluid pacing (hadar) combined with resonant vowels, reflecting deep majesty and awe. In contrast, Sheikh Mishary Rashid Alafasy, a prominent Kuwaiti imam and religious singer, is renowned for his smooth, melodious, and meticulously calm style of recitation that emphasizes tajweed rules with clinical perfection. Educated at the Islamic University of Madinah's College of the Holy Quran, his voice characteristics combine rich baritone vocal control with gentle, reflective transitions. Sheikh Alafasy’s recorded recitation of Surah Yaseen, characterized by slower pacing (tartil), serves as a global benchmark for students learning the correct articulation of Arabic phonetics. Together, both reciters represent the pinnacle of modern Quranic reading styles, offering believers distinct yet equally profound pathways to connect with the scripture. We present these details for spiritual benefit and comprehensive understanding of their unique global impact.
            </p>
          </div>
        </div>
      </section>

      {/* Reciters Profiles Detail & Preview Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Profile 1: Sudais */}
          <div id="sudais" className="glass-card rounded-2xl p-8 border border-caribbean-green/10 flex flex-col justify-between scroll-mt-24">
            <div>
              <span className="text-[10px] uppercase font-bold text-caribbean-green tracking-wider block mb-1">
                Imam of Masjid al-Haram
              </span>
              <h3 className="text-xl font-bold text-white mb-4 font-sans">
                Sheikh Abdurrahmaan As-Sudais
              </h3>
              <table className="w-full text-xs text-gray-300 font-sans mb-6">
                <tbody>
                  <tr className="border-b border-caribbean-green/5">
                    <td className="py-2.5 font-medium text-caribbean-green">Origin</td>
                    <td className="py-2.5 text-white">Qassim, Saudi Arabia</td>
                  </tr>
                  <tr className="border-b border-caribbean-green/5">
                    <td className="py-2.5 font-medium text-caribbean-green">Recitation Style</td>
                    <td className="py-2.5 text-white">Hadar (Fast, Resonant, Emotional)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-medium text-caribbean-green">Key Features</td>
                    <td className="py-2.5 text-white">High pitch, high echo, passionate pacing</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => togglePreview("sudais")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activePreview === "sudais" && isPlaying
                    ? "bg-amber-600 hover:bg-amber-500 text-real-white"
                    : "bg-bangladesh-green hover:bg-caribbean-green text-real-white hover:text-rich-black"
                }`}
              >
                {activePreview === "sudais" && isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>
                  {activePreview === "sudais" && isPlaying 
                    ? `Pause Recitation (Verse ${currentVerseIndex + 1})` 
                    : "Play Full Surah"}
                </span>
              </button>
              {activePreview === "sudais" && isPlaying && (
                <button
                  onClick={stopPreview}
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-red-950/40 border border-red-800/20 text-red-400 hover:bg-red-900 hover:text-real-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Profile 2: Alafasy */}
          <div id="alafasy" className="glass-card rounded-2xl p-8 border border-caribbean-green/10 flex flex-col justify-between scroll-mt-24">
            <div>
              <span className="text-[10px] uppercase font-bold text-caribbean-green tracking-wider block mb-1">
                Imam of Grand Mosque of Kuwait
              </span>
              <h3 className="text-xl font-bold text-white mb-4 font-sans">
                Sheikh Mishary Rashid Alafasy
              </h3>
              <table className="w-full text-xs text-gray-300 font-sans mb-6">
                <tbody>
                  <tr className="border-b border-caribbean-green/5">
                    <td className="py-2.5 font-medium text-caribbean-green">Origin</td>
                    <td className="py-2.5 text-white">Kuwait City, Kuwait</td>
                  </tr>
                  <tr className="border-b border-caribbean-green/5">
                    <td className="py-2.5 font-medium text-caribbean-green">Recitation Style</td>
                    <td className="py-2.5 text-white">Tartil (Slow, Melodious, Precise)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-medium text-caribbean-green">Key Features</td>
                    <td className="py-2.5 text-white">Baritone, calm, strict tajweed compliance</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => togglePreview("alafasy")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activePreview === "alafasy" && isPlaying
                    ? "bg-amber-600 hover:bg-amber-500 text-real-white"
                    : "bg-bangladesh-green hover:bg-caribbean-green text-real-white hover:text-rich-black"
                }`}
              >
                {activePreview === "alafasy" && isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>
                  {activePreview === "alafasy" && isPlaying 
                    ? `Pause Recitation (Verse ${currentVerseIndex + 1})` 
                    : "Play Full Surah"}
                </span>
              </button>
              {activePreview === "alafasy" && isPlaying && (
                <button
                  onClick={stopPreview}
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-red-950/40 border border-red-800/20 text-red-400 hover:bg-red-900 hover:text-real-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Accordion Component (H2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-caribbean-green animate-pulse" /> Recitation FAQs
            </h2>
            <p className="text-sm text-gray-400 mt-2 font-sans">
              Frequently asked questions regarding audio playback, listening, and streaming guidelines.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-dark-green/40 border border-caribbean-green/10 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-sm sm:text-base text-white hover:bg-bangladesh-green/15 transition-colors focus:outline-none"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-caribbean-green transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                
                <div className={`transition-all duration-300 overflow-hidden ${
                  openFaq === i ? "max-h-48 border-t border-caribbean-green/5" : "max-h-0"
                }`}>
                  <p className="p-5 text-sm text-gray-300 leading-relaxed font-sans">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concluding Insight Component (Exactly 60 words) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-dark-green/20 border border-caribbean-green/15 rounded-3xl p-8 text-center shadow-lg">
          <p className="text-sm text-gray-200 leading-relaxed italic font-sans font-medium">
            "In summary, Sheikh Abdurrahmaan As-Sudais and Sheikh Mishary Rashid Alafasy offer two masterclasses in modern Quranic reading styles. By comparing their unique vocal ranges and historical backgrounds, readers can decide which recitation style best fits their learning goals. Explore their full audios, practice tajweed, and share these profiles with fellow students to keep these noble traditions alive today with ease."
          </p>
        </div>
      </section>

      {/* Inline Helpfulness Feedback */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Feedback />
      </div>

      {/* Scroll-to-Top and Share */}
      <ScrollToTop />
      <SocialShare title="Surah Yaseen Reciters Profiles" text="Learn about the biographies and unique vocal styles of Qari Sudais and Sheikh Mishary Alafasy." />
    </div>
  );
}
