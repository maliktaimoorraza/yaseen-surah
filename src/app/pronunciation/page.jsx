"use client";

import { useState } from "react";
import { Volume2, HelpCircle, ChevronDown, Check, HelpCircle as HelpIcon, ArrowRight, Play, Info } from "lucide-react";
import yaseenData from "@/data/surahYaseen.json";
import wordDict from "@/data/wordDictionary.json";
import ScrollToTop from "@/components/ScrollToTop";
import SocialShare from "@/components/SocialShare";
import Feedback from "@/components/Feedback";

export default function PronunciationPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [hoveredWord, setHoveredWord] = useState(null); // { verseId, wordIndex, wordText }
  const [activeSpeech, setActiveSpeech] = useState(null); // word string being spoken

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSpeakWord = (wordText) => {
    if (!window || !window.speechSynthesis) return;

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    // Clean word text from vowel signs for speech synthesis if necessary
    // but the modern speech synthesis engine handles Arabic diacritics well!
    const cleanWord = wordText
      .replace(/[^\u0621-\u064A\s]/g, "") // Keep only Arabic letters
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanWord || wordText);
    utterance.lang = "ar-SA";
    utterance.rate = 0.6; // slower speed for clarity

    utterance.onstart = () => {
      setActiveSpeech(wordText);
    };
    utterance.onend = () => {
      setActiveSpeech(null);
    };
    utterance.onerror = () => {
      setActiveSpeech(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Helper to lookup word in dictionary
  const lookupWord = (word) => {
    // strip common prefixes or suffixes for matching
    const clean = word
      .replace(/[۞ۖۗۘۙۚۛ]/g, "") // strip Quranic stop marks
      .trim();
    
    // Exact match
    if (wordDict[clean]) return wordDict[clean];

    // Try stripping leading "waw" (and) if it exists
    if (clean.startsWith("وَ") && wordDict[clean.slice(2)]) {
      return {
        ...wordDict[clean.slice(2)],
        english: "And " + wordDict[clean.slice(2)].english,
        urdu: "اور " + wordDict[clean.slice(2)].urdu,
        hindi: "और " + wordDict[clean.slice(2)].hindi
      };
    }

    return null;
  };

  // FAQs - exact 35-to-50 words per answer
  const faqs = [
    {
      q: "Why is it important to follow tajweed rules in Surah Yaseen?",
      a: "Following tajweed rules in Surah Yaseen is vital because classical Arabic is highly sensitive to articulation. A slight change in vowel length, nasalization, or consonant emphasis can completely alter the theological meaning of a verse, compromising scriptural integrity."
    },
    {
      q: "How does the word-by-word player pronounce Arabic words?",
      a: "Our word-by-word player utilizes the browser's built-in Web Speech Synthesis engine set to the Arabic locale ('ar-SA'). When you click a tokenized word, the synthesizer reads it aloud, providing a clear reference for individual word articulation."
    },
    {
      q: "What are throat letters (makharij) in Quranic phonetics?",
      a: "Throat letters are six Arabic characters pronounced from the upper, middle, or lower throat: Hamzah, Ha, 'Ayn, Haa, Ghayn, and Khaa. Pronouncing them correctly is essential for proper accent structures and phonetics while reciting Surah Yaseen."
    }
  ];

  return (
    <div className="min-h-screen bg-rich-black text-pure-white pb-12">
      {/* Intro Header Section */}
      <section className="relative py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="w-14 h-14 rounded-full bg-bangladesh-green/40 border border-caribbean-green/20 flex items-center justify-center mx-auto mb-4">
            <Volume2 className="w-7 h-7 text-caribbean-green animate-bounce" />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-caribbean-green font-semibold mb-3 inline-block">
            Word-by-word audio dashboard
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 font-sans">
            Surah Yaseen Pronunciation
          </h1>
          {/* Exactly 100 words Intro */}
          <p className="text-base text-gray-300 leading-relaxed font-sans">
            Learning the correct pronunciation of classical Arabic script requires a fundamental understanding of tajweed rules and phonetics, focusing on specific articulation points (makharij) in the mouth and throat. Each letter and vowel sign (harakah) carries distinct sonic characteristics that must be carefully preserved to maintain scriptural accuracy during recitation. On this interactive phonics guide page, we break down Surah Yaseen into clickable, tokenized words. By interacting with individual tokens below, readers can hear the exact voice pronunciation, examine localized transliterations in Roman English, Hindi, Urdu, and English, and cultivate correct classical articulation with confidence and absolute clarity right here now.
          </p>
        </div>
      </section>

      {/* Image Graphic Placeholder (Aspect-locked 1200px x 675px) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative w-full aspect-[1200/675] max-w-[1200px] mx-auto rounded-3xl overflow-hidden shadow-2xl border border-caribbean-green/20 bg-gradient-to-tr from-rich-black via-dark-green to-rich-black flex flex-col justify-center items-center p-6 text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 font-arabic text-[9vw] select-none pointer-events-none">
            مخارج الحروف سورة يس
          </div>
          <div className="relative z-10 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-bangladesh-green/30 border border-caribbean-green/20 flex items-center justify-center mx-auto mb-5">
              <Volume2 className="w-8 h-8 text-caribbean-green" />
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white mb-2 font-sans">
              Surah Yaseen Phonics & Pronunciation Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto leading-relaxed mb-6">
              Hover over words to read localized definitions or click them to play individual voice phonetics.
            </p>
            <div className="flex justify-center gap-3">
              <span className="text-[10px] bg-rich-black/75 px-4 py-2 rounded-full border border-caribbean-green/10 text-gray-300">
                Tokenized Words
              </span>
              <span className="text-[10px] bg-rich-black/75 px-4 py-2 rounded-full border border-caribbean-green/10 text-gray-300">
                Arabic Voice Synthesis
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Phonics Interactive Engine Board */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-white font-sans">
            Interactive Phonics Dashboard (First 15 Ayat Showcase)
          </h2>
          <p className="text-xs text-gray-400 mt-1 font-sans">
            Hover/Touch a word to inspect translations, click it to trigger voice articulation.
          </p>
        </div>

        <div className="space-y-6">
          {yaseenData.slice(0, 15).map((ayah) => {
            // Split Arabic text by space to tokenize
            const tokens = ayah.arabic.trim().split(/\s+/);
            return (
              <div
                key={ayah.id}
                className="glass-card rounded-2xl p-6 border border-caribbean-green/10 relative"
              >
                {/* Verse Indicator */}
                <div className="flex items-center justify-between mb-4 border-b border-caribbean-green/5 pb-2">
                  <span className="text-xs font-semibold text-caribbean-green bg-rich-black border border-caribbean-green/15 px-3 py-1 rounded-full">
                    Verse {ayah.verse_key}
                  </span>
                  <span className="text-[10px] text-gray-500 font-sans italic">
                    {ayah.transliteration}
                  </span>
                </div>

                {/* Tokenized Word Grid */}
                <div className="flex flex-wrap flex-row-reverse justify-start items-center gap-3 py-4" dir="rtl">
                  {tokens.map((token, wordIdx) => {
                    const dictMatch = lookupWord(token);
                    const isHovered = hoveredWord?.verseId === ayah.id && hoveredWord?.wordIndex === wordIdx;
                    const isSpeaking = activeSpeech === token;

                    return (
                      <div
                        key={wordIdx}
                        className="relative"
                        onMouseEnter={() => setHoveredWord({ verseId: ayah.id, wordIndex: wordIdx, wordText: token })}
                        onMouseLeave={() => setHoveredWord(null)}
                      >
                        {/* Token Clickable Button */}
                        <button
                          onClick={() => handleSpeakWord(token)}
                          className={`px-3 py-2 rounded-xl text-2xl font-arabic transition-all duration-200 cursor-pointer select-none ${
                            isSpeaking
                              ? "bg-caribbean-green text-rich-black scale-105 font-bold shadow-md shadow-caribbean-green/20"
                              : isHovered
                              ? "bg-bangladesh-green text-real-white scale-105 border border-caribbean-green/30"
                              : "bg-dark-green/45 text-white border border-caribbean-green/5 hover:border-caribbean-green/20"
                          }`}
                        >
                          {token}
                        </button>

                        {/* Localized hover tooltip card */}
                        {isHovered && (
                          <div 
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3.5 w-60 rounded-xl bg-dark-green border border-caribbean-green/35 shadow-2xl p-4 z-30 text-left animate-in fade-in zoom-in-95 duration-200"
                            dir="ltr"
                          >
                            {/* Small Arrow indicator */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-dark-green" />
                            
                            <div className="flex items-center justify-between mb-2 pb-1 border-b border-caribbean-green/10">
                              <span className="text-sm font-bold text-white font-arabic">{token}</span>
                              <Volume2 className="w-3.5 h-3.5 text-caribbean-green" />
                            </div>

                            {dictMatch ? (
                              <div className="space-y-2 text-xs font-sans">
                                <div>
                                  <span className="text-[9px] uppercase font-bold text-caribbean-green tracking-wider block">Transliteration</span>
                                  <span className="text-gray-300 italic font-medium">{dictMatch.transliteration}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider block">English</span>
                                  <span className="text-gray-300">{dictMatch.english}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider block">Urdu</span>
                                  <span className="text-gray-300 font-sans" dir="rtl">{dictMatch.urdu}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider block">Hindi</span>
                                  <span className="text-gray-300">{dictMatch.hindi}</span>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-1.5 text-xs font-sans text-gray-300">
                                <p className="italic text-[10px] text-gray-400">Contextual dictionary loading...</p>
                                <p className="text-[11px]">Click this word token to hear voice recitation phonetics.</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Instructional Text (Exactly 200 words) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="glass-card rounded-3xl p-8 sm:p-10 border border-caribbean-green/10">
          <div className="flex items-center gap-2 mb-4 border-b border-caribbean-green/10 pb-3">
            <Info className="w-5 h-5 text-caribbean-green" />
            <h2 className="text-lg font-bold text-white font-sans">
              Quranic Phonics Articulation Rules
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
            Perfecting Quranic phonetics requires strict adherence to tajweed rules, governing how letters interact depending on their adjacent signs. One essential rule is the elongation (madd), which extends the sound of specific vowel letters (alif, waw, ya) when followed by hamzah or a silent letter, varying from two to six beats. Another key principle is the nasalization (ghunnah), a sound emitted from the nasal passage, primarily during the recitation of doubled noon or meem characters, lasting for exactly two counts. Furthermore, students must learn the rule of echoing (qalqalah), which causes a strong vibrating or bouncing sound on five specific consonants (qaf, ta, ba, jim, dal) when they appear with a sukun or silent state. Pronominal letters also undergo clear pronunciation (idhhar) when followed by throat characters, or assimilation (idgham) when merging silently into adjacent letters. When studying Surah Yaseen, applying these tajweed structures is vital to capturing the correct rhythmic flow, maintaining semantic integrity, and preventing critical recitation mistakes that change the theological meanings of the divine verses. Consistent vocal practice, along with listening to expert reciters, will train the vocal tracts to reproduce these phonemes accurately. We offer these detailed phonics breakdowns to support your personal learning journey today.
          </p>
        </div>
      </section>

      {/* FAQs Accordion Component (H2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-caribbean-green animate-pulse" /> Phonics FAQs
            </h2>
            <p className="text-sm text-gray-400 mt-2 font-sans">
              Frequently asked questions regarding tajweed makharij, accents, and pronunciation structures.
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
            "In conclusion, mastering the pronunciation of Surah Yaseen is a highly rewarding spiritual and academic pursuit. By combining our tokenized word-by-word synthesis engine with detailed tajweed rules, you can steadily improve your recitation accuracy. Continue practicing, listen to Sheikh Alafasy or Sheikh Sudais, and share this dashboard with fellow students to spread correct Quranic phonics with absolute ease today now."
          </p>
        </div>
      </section>

      {/* Inline Helpfulness Feedback */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Feedback />
      </div>

      {/* Scroll-to-Top and Share */}
      <ScrollToTop />
      <SocialShare title="Word-by-Word Surah Yaseen Phonics" text="Practice Surah Yaseen word-by-word with built-in voice audio pronunciation guides!" />
    </div>
  );
}
