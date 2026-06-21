"use client";

import { useState } from "react";
import { Heart, Star, Shield, HelpCircle, ChevronDown, CheckCircle, Sparkles, BookOpen } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";
import SocialShare from "@/components/SocialShare";
import Feedback from "@/components/Feedback";

export default function BenefitsPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // FAQs - exact 35-to-50 words per answer
  const faqs = [
    {
      q: "Does reciting Surah Yaseen forgive all sins?",
      a: "Prophetic traditions indicate that reciting Surah Yaseen sincerely at night seeking Allah's pleasure results in the forgiveness of the reciter's previous minor sins. It is a powerful practice for daily purification, spiritual rejuvenation, and strengthening one's connection with the Creator."
    },
    {
      q: "How does Surah Yaseen help with worldly problems?",
      a: "Reciting Surah Yaseen in the morning is believed to resolve difficult tasks, fulfill legitimate worldly needs, and bring divine ease to the reciter's daily affairs. Its verses act as a protective shield and source of immense barakah throughout the day."
    },
    {
      q: "Can Surah Yaseen be read for deceased people?",
      a: "Prophetic Hadiths suggest reciting Surah Yaseen near those who are terminally ill or have recently passed away. The recitation brings descending mercy, alleviates death pangs, grants spiritual comfort to grieving family members, and seeks forgiveness for the deceased."
    },
    {
      q: "Why is it called the heart of the Quran?",
      a: "The Prophet Muhammad (PBUH) described Surah Yaseen as the heart of the Quran because it contains the foundational beliefs of Islam. By focusing on monotheism, prophethood, and resurrection, it represents the vital core message of all divine revelation."
    }
  ];

  return (
    <div className="min-h-screen bg-rich-black text-pure-white pb-12">
      {/* Intro Header Section */}
      <section className="relative py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="w-14 h-14 rounded-full bg-bangladesh-green/40 border border-caribbean-green/20 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-7 h-7 text-caribbean-green animate-pulse" />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-caribbean-green font-semibold mb-3 inline-block">
            Hadith & Spiritual Value
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 font-sans">
            Benefits of Surah Yaseen
          </h1>
          {/* Exactly 100 words Intro */}
          <p className="text-base text-gray-300 leading-relaxed font-sans">
            The spiritual rewards and blessings associated with reciting Surah Yaseen daily are extensively documented throughout authenticated prophetic traditions and historical scholarly consensus. Often referred to as the heart of the Holy Quran, its verses carry profound healing qualities that bring immediate peace to troubled souls, ease complex worldly difficulties, and grant forgiveness of minor sins. On this dedicated benefits portal, we analyze authenticated Hadiths that validate the immense spiritual weight of this chapter. By studying these blessings, believers can foster a deep habit of daily recitation, seeking divine mercy, protection, and the fulfillment of legitimate worldly needs with sincere devotion.
          </p>
        </div>
      </section>

      {/* Image Graphic (Aspect-locked 1200px x 675px) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative w-full aspect-[1200/675] max-w-[1200px] mx-auto rounded-3xl overflow-hidden shadow-2xl border border-caribbean-green/20 bg-gradient-to-tr from-rich-black via-dark-green to-rich-black">
          <img 
            src="/surah-yaseen-benefits.png" 
            alt="worldly and spirtual benefits of surah yaseen" 
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </section>

      {/* Core Typography Grid Architecture */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">
            Surah Yaseen Blessings (Spiritual)
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-caribbean-green to-transparent mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section 1: Forgiveness */}
          <div className="glass-card rounded-2xl p-8 border border-caribbean-green/10 hover:border-caribbean-green/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-caribbean-green shrink-0" />
              <h3 className="text-lg font-bold text-white font-sans">
                1. Absolute Forgiveness of Minor Sins
              </h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              According to a famous Hadith narrated by Jundub bin Abdullah, the Prophet Muhammad (PBUH) said: "Whoever recites Surah Yaseen at night seeking the pleasure of Allah, he will be forgiven." It acts as a powerful nightly spiritual purifier for the believer, cleansing past transgressions and rejuvenating faith.
            </p>
          </div>

          {/* Section 2: Fulfillment of Needs */}
          <div className="glass-card rounded-2xl p-8 border border-caribbean-green/10 hover:border-caribbean-green/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-caribbean-green shrink-0" />
              <h3 className="text-lg font-bold text-white font-sans">
                2. Fulfillment of Wordly and Spiritual Needs
              </h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              A tradition recorded by Ata bin Abi Rabah states that the Prophet (PBUH) said: "Whoever recites Surah Yaseen at the beginning of the day, all his needs for that day will be fulfilled." Believers recite it daily in the morning to invite divine blessings, protection, and success in their tasks.
            </p>
          </div>

          {/* Section 3: Relief of Distress */}
          <div className="glass-card rounded-2xl p-8 border border-caribbean-green/10 hover:border-caribbean-green/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-caribbean-green shrink-0" />
              <h3 className="text-lg font-bold text-white font-sans">
                3. Alleviation of Fear and Grief
              </h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              Due to its emphasis on the mercy of the Creator and the promise of Paradise (as seen in the story of the believer in Verse 26-27), reciting this Surah brings immense peace to troubled minds. It acts as a psychological buffer against anxiety, fear, depression, and spiritual unrest.
            </p>
          </div>

          {/* Section 4: Ease at Death */}
          <div className="glass-card rounded-2xl p-8 border border-caribbean-green/10 hover:border-caribbean-green/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-caribbean-green shrink-0" />
              <h3 className="text-lg font-bold text-white font-sans">
                4. Lightening the Pang Pangs of Death
              </h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              Ma'qil bin Yasar reported that the Prophet (PBUH) said: "Recite Surah Yaseen over those who are dying." Scholars explain that its recitation at the deathbed invites angels, eases the departure of the soul, and provides comfort to the transitioning believer.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs Accordion Component (H2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-caribbean-green animate-pulse" /> Benefits FAQs
            </h2>
            <p className="text-sm text-gray-400 mt-2 font-sans">
              Frequently asked questions regarding the Hadith authentication of Surah Yaseen.
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
          <h2 className="text-xl font-bold text-white mb-4 font-sans">The Bottom Line</h2>
          <p className="text-sm text-gray-200 leading-relaxed italic font-sans font-medium">
            "In conclusion, cultivating a daily habit of reciting Surah Yaseen connects you to a wealth of spiritual and worldly blessings. From forgiveness of sins to immediate relief during times of distress, the heart of the Quran provides constant comfort. Explore these authenticated Hadiths, share the blessings with family, and let this glorious chapter bring light to your daily life today."
          </p>
        </div>
      </section>

      {/* Inline Helpfulness Module */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Feedback />
      </div>

      {/* Scroll-to-Top and Share */}
      <ScrollToTop />
      <SocialShare title="Benefits of Surah Yaseen" text="Read about the authenticated benefits and blessings of reciting Surah Yaseen daily!" />
    </div>
  );
}
