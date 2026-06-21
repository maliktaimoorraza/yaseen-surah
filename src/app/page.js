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
  const [isPageScrolled, setIsPageScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsPageScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Audio Player States
  const [currentVerseIndex, setCurrentVerseIndex] = useState(null); // 0 to 82
  const [isPlaying, setIsPlaying] = useState(false);
  const [continuousPlay, setContinuousPlay] = useState(false);
  const audioRef = useRef(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);



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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync reciter changes during active playback
  useEffect(() => {
    if (isPlaying && currentVerseIndex !== null) {
      playAudio(currentVerseIndex, selectedReciter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedReciter]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVerseIndex]);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // FAQs - exact 35-to-50 words per answer
  const faqs = [
    {
      q: "How Many Ayat In Surah Yaseen?",
      a: "Surah Yaseen has eighty-three verses (ayat), seven hundred and twenty-nine words, and three thousand letters. It is the 36th Chapter of the Holy Qur'an, positioned primarily in Juz 22nd and 23rd, and is a Meccan Surah."
    },
    {
      q: "How To Learn Surah Yaseen?",
      a: "To easily memorize Surah Yasin, break it down into 5 verses for daily memorization. Along with that, you can use our word-by-word pronunciation guide. And listen to Mishary Alafasy or Qari Sudais recitation audio repeatedly to aid the process."
    },
    {
      q: "When To Read Surah Yaseen?",
      a: "Many scholars recommend reciting Surah Yaseen in the early morning. And authentic Hadiths say that its recitation fulfills all the daily spiritual needs for a believer. Additionally, reading it at night or for those passing away can bring peace, mercy, and forgiveness of sins."
    },
    {
      q: "How To Read Surah Yaseen?",
      a: "Read Surah Yaseen as per the tajweed rules by following phonetic transliteration. Ensure you are in a state of wudu, begin with seeking protection from Shaytan, recite slowly, and use our dual translation layers to properly understand its deep meanings."
    },
    {
      q: "What Is Surah Yaseen Good For?",
      a: "Surah Yaseen is an effective source of spiritual healing, ease in difficulties, and forgiveness of sins. As per Hadiths, it is the heart of the Quran, its recitation strengthens faith, brings peace to restless minds, and fulfills many worldly needs."
    },
    {
      q: "Why Surah Yaseen Is Called Heart Of Quran?",
      a: "Prophet Muhammad (PBUH) stated that everything has a heart, and the heart of the Qur'an is Surah Yaseen. It presents the core messages of Islam, focusing on tawheed (monotheism), risalah (prophethood), and the undeniable reality of life after death."
    },
    {
      q: "When Was Surah Yaseen Revealed?",
      a: "Surah Yaseen was revealed in Mecca during the middle phase of prophethood. Its revelation strengthen the faith of early Muslims, establish the truth of the Prophet’s mission, and warn the stubborn leaders of Quraysh who rejected monotheism."
    },
    {
      q: "Can You Recite Surah Yaseen Without Wudu?",
      a: "It is highly recommended and standard practice to perform wudu before touching the Arabic text of Surah Yaseen. However, if you are reciting from memory or reading translations from digital screens without touching Arabic script, wudu is not strictly mandatory."
    }
  ];

  return (
    <div className="min-h-screen bg-rich-black text-pure-white pb-32 md:pb-12">
      {/* Intro Header Section */}
      <section className="relative py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 no-print">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-caribbean-green font-semibold mb-3.5 inline-block">
            Noble Qur&apos;an Chapter 36
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 font-sans">
            Surah Yaseen Read Online
          </h1>
          <p className="text-base text-gray-300 leading-relaxed font-sans mb-4">
            Surah Yaseen is a 36th Chapter of Holy Quran that comes in 22nd and 23rd para. It was revealed to Prophet Muhammad (PBUH) in Mecca, so it is a Meccan Surah. According to Prophet Muhammad everything has a heart and the heart of the Quran is Yaseen Surah and its recitation offers many worldly and <a href="/translation" className="nav-link" title="Surah Yaseen Benfits">spirtual benefits</a> to its readers.
          </p>
          <p className="text-base text-gray-300 leading-relaxed font-sans">
            You can read Surah Yaseen online here on surah-yaseen.org along with Surah Yaseen PDF download. There you will listen to the soulful recitation of Surah e Yaseen by Sheikh Mishary Rashid Alafasy and Sheikh Abdurrahmaan As-Sudais. Apart from listening to the recitation you can download it in MP3.
          </p>

          {/* Quick-Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button
              onClick={() => scrollToSection("read-online")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-caribbean-green/35 bg-bangladesh-green/10 hover:bg-bangladesh-green/30 text-pure-white shadow-md shadow-caribbean-green/5 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-caribbean-green" />
              <span>Read Online</span>
            </button>
            <button
              onClick={() => scrollToSection("pdf-download")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-caribbean-green/35 bg-bangladesh-green/10 hover:bg-bangladesh-green/30 text-pure-white shadow-md shadow-caribbean-green/5 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              <Download className="w-4 h-4 text-caribbean-green" />
              <span>PDF Download</span>
            </button>
            <button
              onClick={() => scrollToSection("mp3-download")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-caribbean-green/35 bg-bangladesh-green/10 hover:bg-bangladesh-green/30 text-pure-white shadow-md shadow-caribbean-green/5 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-caribbean-green" />
              <span>MP3 Download</span>
            </button>
          </div>
        </div>
      </section>

      {/* Hero Image / Banner Panel (Exactly 1200px x 675px Aspect-Ratio Wrapper) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 no-print">
        <div className="relative w-full aspect-[1200/675] max-w-[1200px] mx-auto rounded-3xl overflow-hidden shadow-2xl border border-caribbean-green/20 bg-gradient-to-br from-dark-green to-rich-black">
          <img
            src="/surah-yaseen-pdf-download.png"
            alt="surah yaseen download pdf"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </section>

      {/* Main Interactive Reader Dashboard */}
      <section id="read-online" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 scroll-mt-24">

        {/* Control Dashboard Panel (no-print) */}
        <div className={`fixed bottom-0 left-0 right-0 border-t border-caribbean-green/20 rounded-none shadow-2xl p-3 grid grid-cols-2 gap-3.5 no-print bg-dark-green z-40 transition-all duration-300 md:sticky md:top-20 md:border md:rounded-2xl md:shadow-xl md:mb-8 md:flex md:flex-row md:items-center md:justify-between md:gap-5 md:p-5 ${isPageScrolled
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-100 pointer-events-auto md:opacity-0 md:pointer-events-none md:-translate-y-4 md:scale-95"
          }`}>
          {/* Reciter selector pill */}
          <div className="flex flex-col gap-1 md:gap-2 w-full md:w-auto">
            <span className="text-[10px] uppercase font-semibold text-caribbean-green tracking-wider hidden md:block">
              Reciter Audio Selection
            </span>
            <div className="inline-flex bg-rich-black p-0.5 md:p-1 rounded-xl border border-caribbean-green/10 w-full md:w-auto justify-between md:justify-start">
              <button
                onClick={() => setSelectedReciter("alafasy")}
                className={`flex-1 md:flex-initial px-2 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-semibold rounded-lg transition-all duration-300 ${selectedReciter === "alafasy"
                  ? "bg-bangladesh-green text-real-white shadow-md shadow-caribbean-green/10"
                  : "text-gray-400 hover:text-white"
                  }`}
              >
                Mishary Alafasy
              </button>
              <button
                onClick={() => setSelectedReciter("sudais")}
                className={`flex-1 md:flex-initial px-2 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-semibold rounded-lg transition-all duration-300 ${selectedReciter === "sudais"
                  ? "bg-bangladesh-green text-real-white shadow-md shadow-caribbean-green/10"
                  : "text-gray-400 hover:text-white"
                  }`}
              >
                Qari Sudais
              </button>
            </div>
          </div>

          {/* Text Resizer pill */}
          <div className="flex flex-col gap-1 md:gap-2 w-full md:w-auto">
            <span className="text-[10px] uppercase font-semibold text-caribbean-green tracking-wider hidden md:block">
              Script Typography Resize
            </span>
            <div className="flex items-center bg-rich-black rounded-xl border border-caribbean-green/10 p-0.5 md:p-1 w-full md:w-auto justify-between md:justify-start">
              <button
                onClick={() => setArabicSize(Math.max(1.5, arabicSize - 0.25))}
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-[10px] md:text-xs font-bold text-gray-400 hover:text-white transition-colors"
                title="Decrease Arabic font size"
              >
                A-
              </button>
              <div className="h-5 md:h-6 w-[1px] bg-caribbean-green/10" />
              <div className="w-10 md:w-12 text-center text-[10px] md:text-xs font-semibold text-caribbean-green">
                {Math.round(arabicSize * 40)}%
              </div>
              <div className="h-5 md:h-6 w-[1px] bg-caribbean-green/10" />
              <button
                onClick={() => setArabicSize(Math.min(4.0, arabicSize + 0.25))}
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-[10px] md:text-xs font-bold text-gray-400 hover:text-white transition-colors"
                title="Increase Arabic font size"
              >
                A+
              </button>
            </div>
          </div>

          {/* Translation Checkboxes */}
          <div className="flex flex-col gap-1 md:gap-2 w-full md:w-auto col-span-2 md:col-span-1">
            <span className="text-[10px] uppercase font-semibold text-caribbean-green tracking-wider hidden md:block">
              Active Translations
            </span>
            <div className="flex flex-row justify-around md:justify-start gap-2 md:gap-4 bg-rich-black px-3 py-2 md:px-4 md:py-2.5 rounded-xl border border-caribbean-green/10 text-[10px] md:text-xs">
              <label className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-medium cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showEnglish}
                  onChange={(e) => setShowEnglish(e.target.checked)}
                  className="w-3.5 h-3.5 md:w-4 md:h-4 rounded border-gray-600 text-bangladesh-green focus:ring-0 focus:ring-offset-0 bg-dark-green cursor-pointer accent-caribbean-green"
                />
                <span>English</span>
              </label>
              <label className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-medium cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showUrdu}
                  onChange={(e) => setShowUrdu(e.target.checked)}
                  className="w-3.5 h-3.5 md:w-4 md:h-4 rounded border-gray-600 text-bangladesh-green focus:ring-0 focus:ring-offset-0 bg-dark-green cursor-pointer accent-caribbean-green"
                />
                <span>Urdu (ترجمہ)</span>
              </label>
              <label className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-medium cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showRoman}
                  onChange={(e) => setShowRoman(e.target.checked)}
                  className="w-3.5 h-3.5 md:w-4 md:h-4 rounded border-gray-600 text-bangladesh-green focus:ring-0 focus:ring-offset-0 bg-dark-green cursor-pointer accent-caribbean-green"
                />
                <span>Roman English</span>
              </label>
            </div>
          </div>

          {/* Audio Actions Controller */}
          <div className="flex items-center gap-2 w-full md:w-auto pt-0 border-t-0 md:pt-0 md:border-t-0 col-span-2 md:col-span-1 justify-center md:justify-start">
            <button
              onClick={togglePlayFullSurah}
              className={`flex items-center justify-center gap-1.5 px-4 py-2.5 md:px-5 md:py-3 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 w-full md:w-auto shadow-md ${isPlaying && continuousPlay
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
                className="w-8 h-8 md:w-11 md:h-11 flex items-center justify-center rounded-xl bg-red-950/40 border border-red-800/20 text-red-400 hover:bg-red-900 hover:text-real-white transition-colors shrink-0"
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
                className={`rounded-2xl p-6 sm:p-8 transition-all duration-500 border ${isAyahActive
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
                      className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all ${isAyahActive
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
                  className={`font-arabic text-right mb-6 select-none print-arabic transition-all duration-500 ${isAyahActive ? "active-arabic" : "text-white"
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
                      <p className={`text-sm italic leading-relaxed transition-colors duration-500 ${isAyahActive ? "text-caribbean-green font-semibold" : "text-caribbean-green/90"
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
                      <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${isAyahActive ? "text-pure-white font-medium" : "text-gray-100"
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
                      <p className={`text-base sm:text-lg leading-loose font-sans transition-colors duration-500 ${isAyahActive ? "text-pure-white font-bold" : "text-white font-medium"
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
                Yaseen Surah emphasizes the origin of the Holy Quran. It warns about the consequences of disbelief, and beautifully highlights the resurrection, Allah's sovereignty, and signs of nature as guidance for humanity
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
              This Chapter was revealed to Prophet Muhammad’s during the middle of his earthly mission in Mecca. Its purpose is to reassure the early believers who were facing severe oppression from non- believers. Apart from that, it answers the religious arguments of the polytheistic Quraysh tribe and proves that God's messengers were real.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              Historically, this chapter strongly defended the idea of Prophethood. It shared stories of ancient cities that ignored their leaders and were suddenly destroyed, serving as a big warning to anyone who refused to believe.
            </p>
          </div>

          {/* Themes Card */}
          <div className="glass-card rounded-3xl p-8 border border-caribbean-green/10">
            <h2 className="text-2xl font-bold text-white mb-4 font-sans border-b border-caribbean-green/10 pb-3">
              What Is Surah Yaseen About?
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed font-sans mb-4">
              The main theme of Surah e Yaseen is the sovereignty of Allah Almighty (Tawheed), the confirmation of Prophethood, and the validation of the Day of Judgment (Akhirah). Moreover, it notifies the resurrection of souls as an unquestionable natural reality.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              It also uses various examples from the natural world to show signs of a Creator. For example, the reviving of dead land, the occurrence of day and night in cycles, the revolving of the sun and moon, and the sailing of ships across oceans are proofs of Allah’s mercy and power.
            </p>
          </div>
        </div>
      </section>

      {/* Document PDF Downloader Component */}
      <section id="pdf-download" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 no-print scroll-mt-24">
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
              You can easily save and print the entire Surah Yaseen text with your favorite translation and font size. Our tool automatically sets it up to fit perfectly onto regular A4 paper, making a clean, easy-to-read booklet. Therefore, you can use it offline and share it with your family and friends.
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2.5 bg-bangladesh-green hover:bg-caribbean-green hover:text-rich-black text-real-white font-bold py-4 px-7 rounded-2xl shadow-lg shadow-caribbean-green/10 hover:shadow-xl transition-all duration-300 w-full md:w-auto shrink-0 font-sans cursor-pointer group"
          >
            <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            <span>Download PDF</span>
          </button>
        </div>
      </section>

      {/* Multimedia MP3 Downloader Section */}
      <section id="mp3-download" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 no-print scroll-mt-24">
        <div className="glass-card rounded-3xl p-8 max-w-4xl mx-auto border border-caribbean-green/20">
          <div className="flex items-center gap-2.5 mb-6">
            <Volume2 className="w-5 h-5 text-caribbean-green animate-pulse" />
            <h2 className="text-2xl font-bold text-pure-white font-sans">
              Surah Yaseen MP3 Download
            </h2>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed font-sans mb-8">
            You can listen to and download the <a href="/reciters" class="nav-link" title="Surah Reciters">full recitation of Surah Yaseen</a> to explore offline right here. Choose between two of the world's most famous and inspiring reciters. Pick the slow and calm style of Sheikh Alafasy or the powerful and religiously emotional style of Sheikh As-Sudais.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Reciter 1 Card */}
            <div className="bg-dark-green/40 border border-caribbean-green/10 p-6 rounded-2xl flex flex-col justify-between hover:border-caribbean-green/30 transition-colors duration-300">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white text-base font-sans">
                    Sheikh Mishary Rashid Alafasy
                  </h3>
                  <span className="text-[10px] bg-bangladesh-green/20 text-caribbean-green px-2.5 py-1 rounded-full font-semibold border border-caribbean-green/15">
                    Tartil Style
                  </span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-sans mb-6">
                  A beautiful, calm, and slow recitation focusing on precise tajweed compliance and clear pronunciation, ideal for memorization and learning.
                </p>
                <div className="space-y-2 text-xs text-gray-300 mb-6">
                  <div className="flex justify-between border-b border-caribbean-green/5 pb-2">
                    <span className="text-gray-400">File Type:</span>
                    <span className="font-semibold">High Quality MP3</span>
                  </div>
                  <div className="flex justify-between border-b border-caribbean-green/5 pb-2">
                    <span className="text-gray-400">Bitrate:</span>
                    <span className="font-semibold">128 Kbps</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="font-semibold">16:45 Min</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href="https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/036.mp3"
                  download="Surah_Yaseen_Mishary_Alafasy.mp3"
                  className="flex items-center justify-center gap-2 bg-bangladesh-green hover:bg-caribbean-green hover:text-rich-black text-real-white font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-300 text-xs text-center"
                >
                  <Download className="w-4 h-4" />
                  <span>Download MP3 Audio</span>
                </a>
                <a
                  href="https://server11.mp3quran.net/afs/036.mp3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-xs font-semibold text-caribbean-green hover:underline transition-colors"
                >
                  Alternative Download Link (Mirror)
                </a>
              </div>
            </div>

            {/* Reciter 2 Card */}
            <div className="bg-dark-green/40 border border-caribbean-green/10 p-6 rounded-2xl flex flex-col justify-between hover:border-caribbean-green/30 transition-colors duration-300">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white text-base font-sans">
                    Sheikh Abdurrahmaan As-Sudais
                  </h3>
                  <span className="text-[10px] bg-bangladesh-green/20 text-caribbean-green px-2.5 py-1 rounded-full font-semibold border border-caribbean-green/15">
                    Hadar Style
                  </span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-sans mb-6">
                  An emotional, fast-paced, and highly passionate recitation by the Chief Imam of the Grand Mosque in Makkah, bringing immense spiritual awe.
                </p>
                <div className="space-y-2 text-xs text-gray-300 mb-6">
                  <div className="flex justify-between border-b border-caribbean-green/5 pb-2">
                    <span className="text-gray-400">File Type:</span>
                    <span className="font-semibold">High Quality MP3</span>
                  </div>
                  <div className="flex justify-between border-b border-caribbean-green/5 pb-2">
                    <span className="text-gray-400">Bitrate:</span>
                    <span className="font-semibold">128 Kbps</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="font-semibold">15:10 Min</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href="https://download.quranicaudio.com/quran/abdurrahmaan_as-sudays/036.mp3"
                  download="Surah_Yaseen_Abdurrahman_As_Sudais.mp3"
                  className="flex items-center justify-center gap-2 bg-bangladesh-green hover:bg-caribbean-green hover:text-rich-black text-real-white font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-300 text-xs text-center"
                >
                  <Download className="w-4 h-4" />
                  <span>Download MP3 Audio</span>
                </a>
                <a
                  href="https://server11.mp3quran.net/sds/036.mp3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-xs font-semibold text-caribbean-green hover:underline transition-colors"
                >
                  Alternative Download Link (Mirror)
                </a>
              </div>
            </div>
          </div>
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
              Explore clear guidelines, recitation tips, and complete structural details.            </p>
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

                <div className={`transition-all duration-300 overflow-hidden ${openFaq === i ? "max-h-48 border-t border-caribbean-green/5" : "max-h-0"
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
              You can improve your learning experience by watching these quality Surah Yaseen Recitation videos.  Follow the correct Uthmani script and tajweed rules visually while listening to the famous voices of Qari Abdurrahmaan As-Sudais and Sheikh Mishary Rashid Alafasy. They are perfect for <a href="/pronunciation" class="nav-link" title="Surah Yaseen Pronunciation">accurate pronunciation</a> and spiritual reflection in daily recitation.
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
          <h2 className="text-xl font-bold text-white mb-4 font-sans">The Bottom Line</h2>
          <p className="text-base text-gray-200 leading-relaxed italic font-sans">
            &quot;To Sum It Up, Surah Yaseen stands as a genuine source of light and guidance. It offers unmatched spiritual benefits to everyone who recites and understands deeply. By using the options available on our website, you can seamlessly read, study translations, practice pronunciation, and listen to soulful recitation on a daily basis. Adopt the teachings of this divine chapter and share it with others for the spiritual blessings for you and your family.&quot;
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
