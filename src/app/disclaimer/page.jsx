import ScrollToTop from "@/components/ScrollToTop";

export const metadata = {
  title: "Disclaimer Notice - Surah Yaseen Hub",
  description: "Read the disclaimer notice regarding translation limits, tajweed guides, and audio streams.",
};

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-rich-black text-pure-white py-12 lg:py-16 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-white mb-8 border-b border-caribbean-green/10 pb-4">
          Disclaimer Notice
        </h1>
        
        <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
          <p><strong>Effective Date:</strong> June 19, 2026</p>

          <h2 className="text-lg font-bold text-white mt-8">1. Translation & Pronunciation Limits</h2>
          <p>
            Translations of the Holy Quran are human interpretations of the divine Arabic text. No translation can capture the full theological depth, rhythmic eloquence, or exact semantic structure of the original scripture.
          </p>
          <p>
            While we strive for absolute accuracy in our transliterations and word-by-word dictionaries, they are intended as study aids. They should not replace professional learning under qualified Tajweed scholars.
          </p>

          <h2 className="text-lg font-bold text-white mt-8">2. Web Speech Audio Fallbacks</h2>
          <p>
            Our interactive word-by-word player utilizes client-side browser synthesis engines (`window.speechSynthesis`). Voice models, tone pitches, and accents can vary significantly depending on your browser type, device capabilities, and active speech software. We are not responsible for automated audio articulation errors.
          </p>

          <h2 className="text-lg font-bold text-white mt-8">3. External Links & Media</h2>
          <p>
            We embed video links from external hosting services like YouTube. We do not control their advertisement guidelines, algorithms, or recommended contents surrounding our embedded frames.
          </p>

          <h2 className="text-lg font-bold text-white mt-8">4. Professional Disclaimer</h2>
          <p>
            All information provided on this platform is for general educational and spiritual study. It should not be construed as strict religious rulings (fatwas). Consult certified Islamic institutions for complex jurisprudence queries.
          </p>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}
