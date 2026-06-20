"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Play, Pause, RotateCcw, Type, Eye, Download, ChevronDown, HelpCircle, Volume2, Star, BookOpen, ExternalLink, Printer } from "lucide-react";
import yaseenData from "@/data/surahYaseen.json";
import ScrollToTop from "@/components/ScrollToTop";
import SocialShare from "@/components/SocialShare";
import Feedback from "@/components/Feedback";

export default function Homepage() {
  // Interactive Engine States
  const [arabicSize, setArabicSize] = useState(2.25); // in rem
  const [translationSize, setTranslationSize] = useState(1.125); // in rem
  const [showEnglish, setShowEnglish] = useState(true);
  const [showUrdu, setShowUrdu] = useState(true);
  const [showRoman, setShowRoman] = useState(true);
  const [selectedReciter, setSelectedReciter] = useState("alafasy"); // 'alafasy' or 'sudais'
  
  // Audio Player States
  const [currentVerseIndex, setCurrentVerseIndex] = useState(null); // 0 to 82
  const [isPlaying, setIsPlaying] = useState(false);
  const [continuousPlay, setContinuousPlay] = useState(false);
  const audioRef = useRef(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  // Page Scroll State (for Action Bar visibility)
  const [isPageScrolled, setIsPageScrolled] = useState(false);

  // Refs to avoid stale closure issues in audio listeners
  const stateRef = useRef({
    currentVerseIndex,
    selectedReciter,
    continuousPlay,
    isPlaying
  });

  // Keep refs updated
  useEffect(() => {
    stateRef.current = {
      currentVerseIndex,
      selectedReciter,
      continuousPlay,
      isPlaying
    };
  }, [currentVerseIndex, selectedReciter, continuousPlay, isPlaying]);

  // Track page scroll to toggle Sticky Action Bar visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsPageScrolled(true);
      } else {
        setIsPageScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize single Audio object on mount
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleEnded = () => {
      const { continuousPlay: isCont, currentVerseIndex: idx, selectedReciter: rec } = stateRef.current;
      if (isCont && idx !== null && idx < 82) {
        const nextIndex = idx + 1;
        setCurrentVerseIndex(nextIndex);
        playAudio(nextIndex, rec);
      } else {
        setIsPlaying(false);
        if (idx === 82) {
          setCurrentVerseIndex(null);
        }
      }
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Sync reciter changes during active playback
  useEffect(() => {
    if (isPlaying && currentVerseIndex !== null) {
      playAudio(currentVerseIndex, selectedReciter);
    }
  }, [selectedReciter]);

  const playAudio = (index, reciterName = selectedReciter) => {
    if (!audioRef.current) return;
    
    const verseNum = String(index + 1).padStart(3, "0");
    const reciterPath = reciterName === "alafasy" 
      ? "Alafasy_64kbps" 
      : "Abdurrahmaan_As-Sudais_64kbps";
    
    const audioUrl = `https://everyayah.com/data/${reciterPath}/036${verseNum}.mp3`;
    
    audioRef.current.src = audioUrl;
    audioRef.current.load();
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.error("Audio play failed:", err);
        setIsPlaying(false);
      });
  };

  const togglePlayVerse = (index) => {
    setContinuousPlay(false);
    if (currentVerseIndex === index) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentVerseIndex(index);
      playAudio(index);
    }
  };

  const togglePlayFullSurah = () => {
    setContinuousPlay(true);
    if (isPlaying && continuousPlay) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const startIndex = currentVerseIndex !== null ? currentVerseIndex : 0;
      setCurrentVerseIndex(startIndex);
      playAudio(startIndex);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setCurrentVerseIndex(null);
    setContinuousPlay(false);
  };

  const handlePrint = () => {
    window.print();
  };

  // Scroll to active verse when playing
  useEffect(() => {
    if (currentVerseIndex !== null && isPlaying) {
      const element = document.getElementById(`ayah-card-${currentVerseIndex + 1}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [currentVerseIndex]);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // FAQs - exact 35-to-50 words per answer
  const faqs = [
    {
      q: "How many ayat in Surah Yaseen?",
      a: "Surah Yaseen contains exactly eighty-three verses (ayat), seven hundred and twenty-nine words, and three thousand letters. It is the thirty-sixth surah of the Noble Qur'an, positioned primarily in Juz twenty-two and twenty-three, and classified as a Meccan surah."
    },
    {
      q: "How to learn Surah Yaseen?",
      a: "To memorize Surah Yaseen easily, break down the eighty-three verses into smaller sections of five verses daily. Use our interactive word-by-word pronunciation guide, listen to Mishary Alafasy or Qari Sudais recitation audio repeatedly, and revise regularly to reinforce the verses."
    },
    {
      q: "When to read Surah Yaseen?",
      a: "Reciting Surah Yaseen in the morning is highly recommended, as authenticated Hadiths suggest it fulfills all daily needs for the reciter. Additionally, reading it at night or for those passing away brings peace, mercy, and forgiveness of sins."
    },
    {
      q: "How to read Surah Yaseen?",
      a: "Read Surah Yaseen with tajweed rules by following our online phonetic transliteration. Ensure you are in a clean state of wudu, begin with seek protection from Shaytan, recite slowly, and use our dual translation layers to reflect on its deep meanings."
    },
    {
      q: "What is Surah Yaseen good for?",
      a: "Surah Yaseen is a powerful source of spiritual healing, ease in difficulties, and forgiveness of sins. Often described as the heart of the Quran, its recitation strengthens faith, brings peace to restless minds, and fulfills various legitimate worldly needs."
    },
    {
      q: "Why Surah Yaseen is called heart of quran?",
      a: "Prophet Muhammad (PBUH) stated that everything has a heart, and the heart of the Qur'an is Surah Yaseen. It encapsulates the core messages of Islam, focusing on tawheed (monotheism), risalah (prophethood), and the undeniable reality of life after death."
    },
    {
      q: "When was Surah Yaseen revealed?",
      a: "Surah Yaseen was revealed in Makkah during the middle phase of prophethood. It was sent to strengthen the faith of early Muslims, establish the truth of the Prophet’s mission, and warn the stubborn leaders of Quraysh who rejected monotheism."
    },
    {
      q: "Can you recite Surah Yaseen without wudu?",
      a: "It is highly recommended and standard practice to perform wudu before touching the Arabic text of Surah Yaseen. However, if you are reciting from memory or reading translations from digital screens without touching Arabic script, wudu is not strictly mandatory."
    }
  ];

  return (
    <div className="min-h-screen bg-rich-black text-pure-white pb-12">
      {/* Intro Header Section */}
      <section className="relative py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 no-print">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-caribbean-green font-semibold mb-3.5 inline-block">
            Noble Qur'an Chapter 36
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 font-sans">
            Surah Yaseen Read Online
          </h1>
          {/* Exactly 100 words Intro */}
          <p className="text-base text-gray-300 leading-relaxed font-sans">
            Welcome to Surah Yaseen, a dedicated sanctuary designed to help you connect deeply with the heart of the Holy Qur'an. Surah Yaseen, the thirty-sixth chapter, holds immense spiritual weight, offering light, comfort, and multiple rewards for those who recite it with devotion. Our platform is engineered to elevate your experience by providing a premium, interactive verse-by-verse reader, high-quality audio recitation toggles, customized translation views, and detailed pronunciation guides. Here, you can read online, download optimized PDF documents, and stream prominent reciters, establishing a powerful and transformative daily habit of reflection, study, and learning from this noble scripture with ease.
          </p>
        </div>
      </section>

      {/* Hero Image / Banner Panel (Exactly 1200px x 675px Aspect-Ratio Wrapper) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 no-print">
        <div className="relative w-full aspect-[1200/675] max-w-[1200px] mx-auto rounded-3xl overflow-hidden shadow-2xl border border-caribbean-green/20 bg-gradient-to-br from-dark-green to-rich-black flex flex-col justify-center items-center p-6 text-center group">
          {/* Glowing Calligraphy Pattern Background */}
          <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-caribbean-green via-transparent to-transparent pointer-events-none" />
          
          {/* Large calligraphic text placeholder layout */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 font-arabic text-[12vw] select-none pointer-events-none transition-transform duration-700 group-hover:scale-105">
            يس والقرآن الحكيم
          </div>

          <div className="relative z-10 max-w-xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-bangladesh-green/50 border border-caribbean-green/30 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-rich-black/50">
              <BookOpen className="w-10 h-10 text-caribbean-green" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 tracking-wide font-sans">
              سورہ یٰسین شریف
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-8 max-w-md mx-auto leading-relaxed">
              Experience the Noble Scripture with Interactive Translations, Word-by-Word Pronunciation, Audio Streams, and PDF booklet downloads.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-bold tracking-wider uppercase">
              <span className="bg-rich-black/75 border border-caribbean-green/30 px-5 py-2.5 rounded-full text-caribbean-green">
                ✓ Read Online
              </span>
              <span className="bg-rich-black/75 border border-caribbean-green/30 px-5 py-2.5 rounded-full text-caribbean-green">
                ✓ PDF Download
              </span>
              <span className="bg-rich-black/75 border border-caribbean-green/30 px-5 py-2.5 rounded-full text-caribbean-green">
                ✓ MP3 Audio Download
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Reader Dashboard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* Sticky Control Dashboard Panel (no-print) */}
        <div className={`sticky top-20 z-30 bg-dark-green border border-caribbean-green/20 rounded-2xl p-4 sm:p-5 shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-5 no-print transition-all duration-300 ${
          isPageScrolled 
            ? "opacity-100 translate-y-0 scale-100" 
            : "opacity-0 pointer-events-none -translate-y-4 scale-95"
        }`}>
          {/* Reciter selector pill */}
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <span className="text-[10px] uppercase font-semibold text-caribbean-green tracking-wider">
              Reciter Audio Selection
            </span>
            <div className="inline-flex bg-rich-black p-1 rounded-xl border border-caribbean-green/10">
              <button
                onClick={() => setSelectedReciter("alafasy")}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-300 ${
                  selectedReciter === "alafasy"
                    ? "bg-bangladesh-green text-real-white shadow-md shadow-caribbean-green/10"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Mishary Alafasy
              </button>
              <button
                onClick={() => setSelectedReciter("sudais")}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-300 ${
                  selectedReciter === "sudais"
                    ? "bg-bangladesh-green text-real-white shadow-md shadow-caribbean-green/10"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Qari Sudais
              </button>
            </div>
          </div>

          {/* Translation Checkboxes */}
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <span className="text-[10px] uppercase font-semibold text-caribbean-green tracking-wider">
              Active Translations
            </span>
            <div className="flex flex-wrap gap-4 bg-rich-black px-4 py-2.5 rounded-xl border border-caribbean-green/10">
              <label className="flex items-center gap-2 text-xs font-medium cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showEnglish}
                  onChange={(e) => setShowEnglish(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 text-bangladesh-green focus:ring-0 focus:ring-offset-0 bg-dark-green cursor-pointer accent-caribbean-green"
                />
                <span>English</span>
              </label>
              <label className="flex items-center gap-2 text-xs font-medium cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showUrdu}
                  onChange={(e) => setShowUrdu(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 text-bangladesh-green focus:ring-0 focus:ring-offset-0 bg-dark-green cursor-pointer accent-caribbean-green"
                />
                <span>Urdu (ترجمہ)</span>
              </label>
              <label className="flex items-center gap-2 text-xs font-medium cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showRoman}
                  onChange={(e) => setShowRoman(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 text-bangladesh-green focus:ring-0 focus:ring-offset-0 bg-dark-green cursor-pointer accent-caribbean-green"
                />
                <span>Roman English</span>
              </label>
            </div>
          </div>

          {/* Text Resizer pill */}
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <span className="text-[10px] uppercase font-semibold text-caribbean-green tracking-wider">
              Script Typography Resize
            </span>
            <div className="flex items-center bg-rich-black rounded-xl border border-caribbean-green/10 p-1">
              <button
                onClick={() => setArabicSize(Math.max(1.5, arabicSize - 0.25))}
                className="w-10 h-10 flex items-center justify-center text-xs font-bold text-gray-400 hover:text-white transition-colors"
                title="Decrease Arabic font size"
              >
                A-
              </button>
              <div className="h-6 w-[1px] bg-caribbean-green/10" />
              <div className="w-12 text-center text-xs font-semibold text-caribbean-green">
                {Math.round(arabicSize * 40)}%
              </div>
              <div className="h-6 w-[1px] bg-caribbean-green/10" />
              <button
                onClick={() => setArabicSize(Math.min(4.0, arabicSize + 0.25))}
                className="w-10 h-10 flex items-center justify-center text-xs font-bold text-gray-400 hover:text-white transition-colors"
                title="Increase Arabic font size"
              >
                A+
              </button>
            </div>
          </div>

          {/* Audio Actions Controller */}
          <div className="flex items-center gap-2.5 w-full md:w-auto pt-2 md:pt-0 border-t border-caribbean-green/10 md:border-t-0">
            <button
              onClick={togglePlayFullSurah}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 w-full md:w-auto shadow-md ${
                isPlaying && continuousPlay
                  ? "bg-amber-600 hover:bg-amber-500 text-real-white shadow-amber-600/10"
                  : "bg-gradient-to-r from-bangladesh-green to-caribbean-green hover:opacity-95 text-real-white shadow-caribbean-green/10"
              }`}
            >
              {isPlaying && continuousPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying && continuousPlay ? "Pause Audio" : "Play Full Surah"}</span>
            </button>
            {isPlaying && (
              <button
                onClick={stopAudio}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-red-950/40 border border-red-800/20 text-red-400 hover:bg-red-900 hover:text-real-white transition-colors"
                title="Stop Recitation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Verse-by-Verse List */}
        <div className="space-y-6 print-container">
          {/* Bismillah Card (Header display for start of recitation) */}
          <div className="glass-card rounded-2xl p-6 text-center print-card print-page-break">
            <div className="text-xs uppercase tracking-widest text-caribbean-green/80 font-bold mb-3 no-print">
              In the Name of Allah
            </div>
            <div className="font-arabic text-3xl sm:text-4xl text-white py-2 print-arabic select-none leading-loose">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
            </div>
            <div className="text-sm text-gray-400 font-sans mt-2 print-translation italic">
              In the name of Allah, the Entirely Merciful, the Especially Merciful.
            </div>
          </div>

          {yaseenData.map((ayah, idx) => {
            const isAyahActive = currentVerseIndex === idx && isPlaying;
            return (
              <div
                key={ayah.id}
                id={`ayah-card-${ayah.id}`}
                className={`rounded-2xl p-6 sm:p-8 transition-all duration-500 border ${
                  isAyahActive
                    ? "active-card"
                    : "glass-card border-caribbean-green/10"
                } print-card print-page-break`}
              >
                {/* Verse Header Info */}
                <div className="flex items-center justify-between border-b border-caribbean-green/10 pb-4 mb-5 no-print">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-rich-black text-xs font-semibold text-caribbean-green border border-caribbean-green/20">
                    Verse {ayah.verse_key}
                  </span>
                  
                  {/* Actions (Play audio, deep links) */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => togglePlayVerse(idx)}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all ${
                        isAyahActive
                          ? "bg-caribbean-green text-rich-black border-caribbean-green"
                          : "bg-rich-black border-caribbean-green/20 text-gray-400 hover:text-white hover:border-caribbean-green/50"
                      }`}
                      title={isAyahActive ? "Pause Recitation" : "Play Recitation"}
                    >
                      {isAyahActive ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                    </button>
                    <Link
                      href={`/pronunciation?ayah=${ayah.id}`}
                      className="w-9 h-9 rounded-lg bg-rich-black border border-caribbean-green/20 text-gray-400 hover:text-white hover:border-caribbean-green/50 flex items-center justify-center transition-all"
                      title="View Word-by-Word guide"
                    >
                      <Volume2 className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Arabic Script */}
                <div 
                  className={`font-arabic text-right mb-6 select-none print-arabic transition-all duration-500 ${
                    isAyahActive ? "active-arabic" : "text-white"
                  }`}
                  style={{ fontSize: `${arabicSize}rem`, lineHeight: 2 }}
                >
                  {ayah.arabic}
                </div>

                {/* Translation Matrix Layers */}
                <div className="space-y-4 font-sans text-gray-300">
                  {showRoman && (
                    <div className="flex flex-col gap-1 print-translation">
                      <span className="text-[10px] font-bold text-caribbean-green/80 uppercase tracking-wider no-print">
                        Transliteration
                      </span>
                      <p className={`text-sm italic leading-relaxed transition-colors duration-500 ${
                        isAyahActive ? "text-caribbean-green font-semibold" : "text-caribbean-green/90"
                      }`}>
                        {ayah.transliteration}
                      </p>
                    </div>
                  )}

                  {showEnglish && (
                    <div className="flex flex-col gap-1 border-t border-caribbean-green/5 pt-3 print-translation">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider no-print">
                        English Translation (Sahih International)
                      </span>
                      <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${
                        isAyahActive ? "text-pure-white font-medium" : "text-gray-100"
                      }`}>
                        {ayah.english}
                      </p>
                    </div>
                  )}

                  {showUrdu && (
                    <div className="flex flex-col gap-1 border-t border-caribbean-green/5 pt-3 text-right items-end print-translation" dir="rtl">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider no-print">
                        اردو ترجمہ (جالندھری)
                      </span>
                      <p className={`text-base sm:text-lg leading-loose font-sans transition-colors duration-500 ${
                        isAyahActive ? "text-pure-white font-bold" : "text-white font-medium"
                      }`}>
                        {ayah.urdu}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Structural Metrics Key Facts Panel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 no-print">
        <div className="glass-card rounded-3xl p-8 max-w-4xl mx-auto border border-caribbean-green/20">
          <div className="flex items-center gap-2.5 mb-6">
            <Star className="w-5 h-5 text-caribbean-green animate-pulse" />
            <h2 className="text-xl font-bold text-pure-white font-sans">
              Surah Yaseen Key Structural Facts
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Tabular Grid */}
            <div className="lg:col-span-2 overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-300 font-sans border-collapse">
                <tbody>
                  <tr className="border-b border-caribbean-green/10">
                    <td className="py-3 font-semibold text-caribbean-green">Juz / Para</td>
                    <td className="py-3 text-white">Juz 22 & Juz 23</td>
                    <td className="py-3 font-semibold text-caribbean-green">Revelation Order</td>
                    <td className="py-3 text-white">41st Chapter</td>
                  </tr>
                  <tr className="border-b border-caribbean-green/10">
                    <td className="py-3 font-semibold text-caribbean-green">Total Verses (Ayat)</td>
                    <td className="py-3 text-white">83 Verses</td>
                    <td className="py-3 font-semibold text-caribbean-green">Total Words</td>
                    <td className="py-3 text-white">729 Words</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-caribbean-green">Classification</td>
                    <td className="py-3 text-white">Meccan (Makki)</td>
                    <td className="py-3 font-semibold text-caribbean-green">Total Letters</td>
                    <td className="py-3 text-white">3,000 Letters</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Exactly 30-word Summary block */}
            <div className="bg-rich-black border border-caribbean-green/10 p-5 rounded-2xl">
              <span className="text-[10px] uppercase font-bold text-caribbean-green tracking-wider block mb-2">
                Core Summary
              </span>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                Surah Yaseen emphasizes the divine origin of the Qur'an, warns of the consequences of disbelief, and beautifully highlights the resurrection, Allah's sovereignty, and signs of nature as guidance for mankind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Content Sections (H2 Architecture) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 no-print">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* History Card */}
          <div className="glass-card rounded-3xl p-8 border border-caribbean-green/10">
            <h2 className="text-2xl font-bold text-white mb-4 font-sans border-b border-caribbean-green/10 pb-3">
              Surah Yaseen History
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed font-sans mb-4">
              Revealed in Makkah during the middle period of the Prophet Muhammad's (PBUH) mission, Surah Yaseen was sent to reassure the early believers facing severe persecution. It addresses the theological challenges of the polytheistic Quraysh and establishes absolute evidence of divine messengers.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              Historically, this chapter served as a strong defense of the Prophethood (risalah). By detailing historical accounts of past cities that rejected their guides and faced sudden annihilation, it warned of persistent disbelief.
            </p>
          </div>

          {/* Themes Card */}
          <div className="glass-card rounded-3xl p-8 border border-caribbean-green/10">
            <h2 className="text-2xl font-bold text-white mb-4 font-sans border-b border-caribbean-green/10 pb-3">
              What is Surah Yaseen About?
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed font-sans mb-4">
              The primary theme of Surah Yaseen revolves around the absolute sovereignty of Allah (tawheed), the confirmation of prophethood, and the certainty of the Day of Judgment (akhirah). It presents the resurrection of souls as an undeniable natural reality.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              It also presents numerous visual signs from nature—such as the reviving of dead land, the alternating cycles of day and night, the orbit of the sun and moon, and the sailing of ships across oceans—as proofs of divine mercy and power.
            </p>
          </div>
        </div>
      </section>

      {/* Document PDF Downloader Component */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 no-print">
        <div className="bg-gradient-to-r from-dark-green to-rich-black border border-caribbean-green/20 rounded-3xl p-8 max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Printer className="w-5 h-5 text-caribbean-green" />
              <h2 className="text-xl font-bold text-white font-sans">
                Surah Yaseen PDF Download
              </h2>
            </div>
            {/* Exactly 45 words Explanatory paragraph */}
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              Easily export the complete Surah Yaseen text including your custom selected translations and font size preferences. Our optimized print utility formats the scripture into an A4 layout booklet for offline reading, reciting, or sharing, ensuring a beautiful, distraction-free typography layout on physical paper with ease.
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2.5 bg-bangladesh-green hover:bg-caribbean-green hover:text-rich-black text-real-white font-bold py-4 px-7 rounded-2xl shadow-lg shadow-caribbean-green/10 hover:shadow-xl transition-all duration-300 w-full md:w-auto shrink-0 font-sans cursor-pointer group"
          >
            <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            <span>Export to PDF Booklet</span>
          </button>
        </div>
      </section>

      {/* Structured FAQs Accordion Component (H2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 no-print">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white font-sans flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-caribbean-green animate-pulse" /> Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-400 mt-2 font-sans">
              Find reliable, contextual answers regarding recitation, guidelines, and structural metrics.
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

      {/* Multimedia Recitation Video Integration Hub */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 no-print">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">
              Surah Yaseen Video (Recitation)
            </h2>
            {/* Exactly 50-word text block */}
            <p className="text-sm text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed font-sans">
              Enhance your listening and learning experience by watching these high-quality video recitations of Surah Yaseen. Follow the correct Uthmani script and tajweed rules visually while listening to the renowned voices of Qari Abdurrahmaan As-Sudais and Sheikh Mishary Rashid Alafasy, perfect for correct pronunciation and spiritual reflection in daily recitation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Video 1: Sudais */}
            <div className="glass-card rounded-2xl overflow-hidden border border-caribbean-green/10 flex flex-col">
              <div className="aspect-video w-full bg-rich-black">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/1Jb8MJ8K2tc"
                  title="Qari Sudais Surah Yaseen Recitation Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <h3 className="font-bold text-white text-base mb-1 font-sans">
                  Qari Sudais Recitation
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  Visual Uthmani script recitation video voiced by Sheikh Abdurrahmaan As-Sudais, Chief Imam of Masjid al-Haram.
                </p>
              </div>
            </div>

            {/* Video 2: Alafasy */}
            <div className="glass-card rounded-2xl overflow-hidden border border-caribbean-green/10 flex flex-col">
              <div className="aspect-video w-full bg-rich-black">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/kFn64z09MWA"
                  title="Mishary Rashid Alafasy Surah Yaseen Recitation Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <h3 className="font-bold text-white text-base mb-1 font-sans">
                  Mishary Rashid Alafasy Recitation
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  Melodious recitation video voiced by Sheikh Mishary Rashid Alafasy, featuring Uthmani calligraphy layout tracks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concluding Insight Component (Exactly 70 words) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 no-print">
        <div className="max-w-2xl mx-auto bg-dark-green/20 border border-caribbean-green/15 rounded-3xl p-8 text-center shadow-lg">
          <p className="text-base text-gray-200 leading-relaxed italic font-sans">
            "In conclusion, Surah Yaseen stands as a profound source of light and guidance, offering unmatched spiritual benefits to everyone who approaches it with sincerity. By utilizing the advanced features of Surah Yaseen, you can seamlessly read, study translations, practice pronunciation, and listen to beautiful recitations daily. Embrace the teachings of this glorious chapter, share these blessed materials with others, and cultivate a lasting spiritual connection with the Holy Quran."
          </p>
        </div>
      </section>

      {/* Inline Helpfulness Module */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 no-print">
        <Feedback />
      </div>

      {/* Float utilities */}
      <ScrollToTop />
      <SocialShare title="Read Surah Yaseen Online" text="Read and listen to Surah Yaseen with translation and phonics online!" />
    </div>
  );
}
