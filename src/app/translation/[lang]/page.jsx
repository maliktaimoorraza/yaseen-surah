import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Languages, ArrowRight, ArrowLeft, Download, Printer } from "lucide-react";
import yaseenData from "@/data/surahYaseen.json";
import ScrollToTop from "@/components/ScrollToTop";
import SocialShare from "@/components/SocialShare";
import Feedback from "@/components/Feedback";

// Dynamic metadata generation for SEO
export async function generateMetadata({ params }) {
  const { lang } = await params;
  const langConfig = {
    urdu: {
      title: "Surah Yaseen Urdu Translation - سوره یٰسین اردو ترجمہ",
      desc: "Read Surah Yaseen with clear Arabic text and Fateh Muhammad Jalandhari's Urdu translation. Access continuous reading text, PDF download, and recitation details."
    },
    hindi: {
      title: "Surah Yaseen Hindi Translation - सूरह यासीन हिन्दी अनुवाद",
      desc: "Read Surah Yaseen with Arabic script and Maulana Azizul Haque al-Umari's Hindi translation. Access transliteration and study guides."
    },
    english: {
      title: "Surah Yaseen English Translation - Read Chapter 36",
      desc: "Read Surah Yaseen in English with Saheeh International translation. View side-by-side Arabic verses, download PDF, and review phonics keys."
    }
  };

  const current = langConfig[lang.toLowerCase()];
  if (!current) {
    return {
      title: "Surah Yaseen Translation Hub - Surah Yaseen"
    };
  }

  return {
    title: `${current.title} - Surah Yaseen`,
    description: current.desc,
  };
}

export default async function SubTranslationPage({ params }) {
  const { lang } = await params;
  const lowerLang = lang.toLowerCase();

  const langConfig = {
    urdu: {
      name: "Urdu (اردو)",
      translator: "Fateh Muhammad Jalandhari",
      desc: "This page displays the entire Surah Yaseen with the classic, widely acclaimed Urdu translation by Fateh Muhammad Jalandhari. Perfect for study, recitation, and memorization in the Urdu language.",
      fontClass: "font-sans font-medium text-lg text-right",
      direction: "rtl"
    },
    hindi: {
      name: "Hindi (हिन्दी)",
      translator: "Maulana Azizul Haque al-Umari",
      desc: "Enjoy the complete text of Surah Yaseen in Hindi translation, authored by Maulana Azizul Haque al-Umari. Perfect for Hindi readers wishing to study the Quranic message with literal precision.",
      fontClass: "font-sans text-sm sm:text-base text-left",
      direction: "ltr"
    },
    english: {
      name: "English",
      translator: "Saheeh International",
      desc: "Explore Chapter 36 of the Holy Quran translated into contemporary English by Saheeh International. This translation is highly recommended for its linguistic accuracy and modern styling.",
      fontClass: "font-sans text-sm sm:text-base text-left",
      direction: "ltr"
    }
  };

  const current = langConfig[lowerLang];
  if (!current) {
    notFound();
  }

  // Filter other languages for the bottom related slider
  const otherLanguages = Object.keys(langConfig).filter(k => k !== lowerLang).map(k => ({
    slug: k,
    ...langConfig[k]
  }));

  return (
    <div className="min-h-screen bg-rich-black text-pure-white pb-12">
      {/* Page Header */}
      <section className="relative py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 no-print">
        <div className="max-w-3xl mx-auto text-center">
          <Link
            href="/translation"
            className="inline-flex items-center gap-1 text-xs text-caribbean-green hover:underline mb-4 font-sans uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Translation Grid
          </Link>
          <h1 className="text-4xl font-extrabold text-white mb-4 font-sans">
            Surah Yaseen {current.name} Translation
          </h1>
          <p className="text-xs text-caribbean-green/80 uppercase font-bold tracking-widest mb-6">
            Translation by: {current.translator}
          </p>
          <p className="text-sm text-gray-300 leading-relaxed max-w-2xl mx-auto font-sans">
            {current.desc}
          </p>
        </div>
      </section>

      {/* Reader Main Board */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="space-y-6 print-container">
          {/* Bismillah Header */}
          <div className="glass-card rounded-2xl p-6 text-center print-card print-page-break">
            <div className="font-arabic text-3xl text-white py-1 print-arabic leading-loose select-none">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
            </div>
            <div className="text-xs text-gray-400 font-sans mt-2 print-translation italic">
              In the name of Allah, the Entirely Merciful, the Especially Merciful.
            </div>
          </div>

          {/* Verses listing */}
          {yaseenData.map((ayah) => (
            <div
              key={ayah.id}
              className="glass-card rounded-2xl p-6 sm:p-8 border border-caribbean-green/10 print-card print-page-break"
            >
              {/* Verse marker */}
              <div className="flex items-center justify-between border-b border-caribbean-green/10 pb-3 mb-5 no-print">
                <span className="text-xs font-semibold text-caribbean-green bg-rich-black border border-caribbean-green/15 px-3 py-1 rounded-full">
                  Verse {ayah.verse_key}
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-sans">
                  Surah Yaseen
                </span>
              </div>

              {/* Arabic */}
              <div className="font-arabic text-3xl text-white text-right leading-loose mb-6 select-none print-arabic">
                {ayah.arabic}
              </div>

              {/* Specific Translation */}
              <div 
                className={`${current.fontClass} border-t border-caribbean-green/5 pt-4 text-gray-100 print-translation`}
                dir={current.direction}
              >
                <span className="text-[9px] uppercase tracking-wider text-caribbean-green block font-bold mb-1.5 no-print">
                  {current.name} Translation
                </span>
                <p className="leading-relaxed">
                  {ayah[lowerLang]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Translations Horizontal Scroll Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 no-print">
        <div className="max-w-4xl mx-auto border-t border-caribbean-green/10 pt-12">
          <h2 className="text-lg font-bold text-white mb-6 font-sans text-center">
            Related Translations
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {otherLanguages.map((langItem) => (
              <Link
                key={langItem.slug}
                href={`/translation/${langItem.slug}`}
                className="flex-1 glass-card rounded-2xl p-6 border border-caribbean-green/10 hover:border-caribbean-green/40 hover:bg-dark-green/30 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-caribbean-green tracking-wider block mb-1">
                    {langItem.translator}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2 font-sans">
                    {langItem.name} Translation
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans mb-4">
                    Explore the complete 83 verses of Surah Yaseen translated into {langItem.name}.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-caribbean-green group-hover:text-white transition-colors mt-4">
                  <span>Read Now</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Inline Helpfulness Feedback */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 no-print">
        <Feedback />
      </div>

      {/* Scroll-to-Top and Share */}
      <ScrollToTop />
      <SocialShare 
        title={`Surah Yaseen ${current.name} Translation`} 
        text={`Read the complete Surah Yaseen in ${current.name} translated by ${current.translator}.`} 
      />
    </div>
  );
}
