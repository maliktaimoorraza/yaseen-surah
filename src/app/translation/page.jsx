"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Languages, HelpCircle, ChevronDown, ArrowRight, Star } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";
import SocialShare from "@/components/SocialShare";
import Feedback from "@/components/Feedback";

export default function TranslationLanding() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // FAQs - exact 35-to-50 words per answer
  const faqs = [
    {
      q: "What translations are available for Surah Yaseen?",
      a: "We provide three complete, high-quality translations for Surah Yaseen: Fateh Muhammad Jalandhari's Urdu translation, Maulana Azizul Haque al-Umari's Hindi translation, and Saheeh International's English translation. These translations are rendered side-by-side with Arabic script to facilitate deep linguistic analysis."
    },
    {
      q: "How to compare translations of Surah Yaseen?",
      a: "You can compare translations of Surah Yaseen on our Homepage by ticking the checkboxes for English, Urdu, or Roman English. This dynamic view displays all selected translations simultaneously under each verse, offering a powerful comparative interface for research."
    },
    {
      q: "Why do translations of Surah Yaseen vary?",
      a: "Arabic is a rich, multi-layered language where a single word has many contextual meanings. Translators choose different expressions to capture literal accuracy, theological nuances, or fluid reading structures. Comparing multiple versions helps readers understand the comprehensive meaning of each verse."
    }
  ];

  return (
    <div className="min-h-screen bg-rich-black text-pure-white pb-12">
      {/* Intro Header Section */}
      <section className="relative py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-caribbean-green font-semibold mb-3.5 inline-block">
            Linguistic Hub
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 font-sans">
            Surah Yaseen Translations
          </h1>
          {/* Exactly 100 words Intro */}
          <p className="text-base text-gray-300 leading-relaxed font-sans">
            The translation of Surah Yaseen requires a rigorous linguistic methodology to capture the depth, theological precision, and eloquence of the original classical Arabic scripture. Translating between Arabic and major languages like Urdu, Hindi, and English demands careful cross-referencing of root verbs and contextual historical meanings. On this page, we offer a dedicated translation landing hub that allows readers to explore distinct localized versions of the text. By selecting one of our three comprehensive language editions below, you can examine word-by-word variations, reflect on historical interpretations, and deepen your overall spiritual understanding of this glorious Quranic heart with great spiritual profit.
          </p>
        </div>
      </section>

      {/* Image Graphic Placeholder (Aspect-locked 1200px x 675px) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative w-full aspect-[1200/675] max-w-[1200px] mx-auto rounded-3xl overflow-hidden shadow-2xl border border-caribbean-green/20 bg-gradient-to-tr from-dark-green via-rich-black to-dark-green flex flex-col justify-center items-center p-6 text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 font-arabic text-[9vw] select-none pointer-events-none">
            ترجمة سورة يس
          </div>
          <div className="relative z-10 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-bangladesh-green/40 border border-caribbean-green/30 flex items-center justify-center mx-auto mb-5">
              <Languages className="w-8 h-8 text-caribbean-green" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 font-sans">
              Surah Yaseen Translation Graphic Sheet
            </h2>
            <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed mb-6">
              Visualizing the structural translations across Urdu, Hindi, and English. Match root words and verify contextual Tafsirs easily.
            </p>
            <div className="flex justify-center gap-3">
              <span className="text-[10px] bg-rich-black/75 px-4 py-2 rounded-full border border-caribbean-green/10 text-gray-300">
                Urdu translation
              </span>
              <span className="text-[10px] bg-rich-black/75 px-4 py-2 rounded-full border border-caribbean-green/10 text-gray-300">
                Hindi translation
              </span>
              <span className="text-[10px] bg-rich-black/75 px-4 py-2 rounded-full border border-caribbean-green/10 text-gray-300">
                English translation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Language Grid Hub (3 distinct cards in dark-green with active border highlights) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Card 1: Urdu */}
          <div className="glass-card rounded-2xl p-8 flex flex-col justify-between items-start group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-bangladesh-green/40 border border-caribbean-green/20 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                <span className="text-lg font-bold text-caribbean-green font-sans">اردو</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-sans">
                Urdu Translation
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-sans mb-6">
                Read the classic translation by Fateh Muhammad Jalandhari. Perfect for native Urdu speakers seeking precise classical vocabulary.
              </p>
            </div>
            <Link
              href="/translation/urdu"
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-caribbean-green group-hover:text-white transition-colors mt-auto"
            >
              <span>Explore Urdu Sub-page</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Card 2: Hindi */}
          <div className="glass-card rounded-2xl p-8 flex flex-col justify-between items-start group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-bangladesh-green/40 border border-caribbean-green/20 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                <span className="text-lg font-bold text-caribbean-green font-sans">हिन्दी</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-sans">
                Hindi Translation
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-sans mb-6">
                Study Maulana Azizul Haque al-Umari's translation in Hindi script, maintaining absolute readability and authentic meanings.
              </p>
            </div>
            <Link
              href="/translation/hindi"
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-caribbean-green group-hover:text-white transition-colors mt-auto"
            >
              <span>Explore Hindi Sub-page</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Card 3: English */}
          <div className="glass-card rounded-2xl p-8 flex flex-col justify-between items-start group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-bangladesh-green/40 border border-caribbean-green/20 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                <span className="text-lg font-bold text-caribbean-green font-sans">EN</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-sans">
                English Translation
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-sans mb-6">
                Understand the divine message through Saheeh International's contemporary English, acclaimed for accurate grammar and flow.
              </p>
            </div>
            <Link
              href="/translation/english"
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-caribbean-green group-hover:text-white transition-colors mt-auto"
            >
              <span>Explore English Sub-page</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs Accordion Component (H2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-caribbean-green animate-pulse" /> Translation FAQs
            </h2>
            <p className="text-sm text-gray-400 mt-2 font-sans">
              Frequently asked questions regarding Surah Yaseen linguistic translations.
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

      {/* Concluding Insight Component (Exactly 50 words) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-2xl mx-auto bg-dark-green/20 border border-caribbean-green/15 rounded-3xl p-8 text-center shadow-lg">
          <p className="text-sm text-gray-200 leading-relaxed italic font-sans">
            "In conclusion, exploring multiple translations of Surah Yaseen is essential to grasping the complete message of this glorious chapter. Whether you study in Urdu, Hindi, or English, each translation offers unique linguistic perspectives. Please use the cross-linked cards below to navigate smoothly through our independent, detailed translation pages right now."
          </p>
        </div>
      </section>

      {/* Related Posts Recommendation Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto border-t border-caribbean-green/10 pt-12">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-caribbean-green mb-6 font-sans text-center">
            Related Translations / Sub-pages
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/translation/urdu"
              className="glass-card rounded-xl p-4 text-center hover:bg-bangladesh-green/20 hover:border-caribbean-green transition-all"
            >
              <span className="text-sm font-bold text-white block mb-1">Urdu translation</span>
              <span className="text-[10px] text-gray-400">Fateh Muhammad Jalandhari</span>
            </Link>
            <Link
              href="/translation/hindi"
              className="glass-card rounded-xl p-4 text-center hover:bg-bangladesh-green/20 hover:border-caribbean-green transition-all"
            >
              <span className="text-sm font-bold text-white block mb-1">Hindi translation</span>
              <span className="text-[10px] text-gray-400">Maulana Azizul Haque</span>
            </Link>
            <Link
              href="/translation/english"
              className="glass-card rounded-xl p-4 text-center hover:bg-bangladesh-green/20 hover:border-caribbean-green transition-all"
            >
              <span className="text-sm font-bold text-white block mb-1">English translation</span>
              <span className="text-[10px] text-gray-400">Saheeh International</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Inline Helpfulness Module */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Feedback />
      </div>

      {/* Float utilities */}
      <ScrollToTop />
      <SocialShare title="Surah Yaseen Translations Hub" text="Compare Surah Yaseen translations in Urdu, English, and Hindi side-by-side!" />
    </div>
  );
}
