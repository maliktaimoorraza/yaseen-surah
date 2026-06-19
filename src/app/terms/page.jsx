import ScrollToTop from "@/components/ScrollToTop";

export const metadata = {
  title: "Terms and Conditions - Surah Yaseen Hub",
  description: "Read the terms of use governing Surah Yaseen Hub platform services.",
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-rich-black text-pure-white py-12 lg:py-16 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-white mb-8 border-b border-caribbean-green/10 pb-4">
          Terms and Conditions
        </h1>
        
        <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
          <p><strong>Effective Date:</strong> June 19, 2026</p>

          <p>
            By accessing and using Surah Yaseen Hub, you agree to comply with and be bound by the following Terms and Conditions. Please review them carefully.
          </p>

          <h2 className="text-lg font-bold text-white mt-8">1. Intellectual Property & Usage License</h2>
          <p>
            The original Uthmani Arabic text of the Holy Quran is free from human ownership. The English, Urdu, and Hindi translations and audio files streamed on this platform are for personal study, spiritual reflection, and educational purposes only.
          </p>

          <h2 className="text-lg font-bold text-white mt-8">2. Prohibited Activities</h2>
          <p>
            You agree not to engage in:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Attempting to scrape, modify, or corrupt website code, databases, or script assets.</li>
            <li>Redistributing the compiled word-by-word dictionary JSON files for commercial gain without credit.</li>
            <li>Using automated bots to crawl audio recitation endpoints in a manner that strains server bandwidth.</li>
          </ul>

          <h2 className="text-lg font-bold text-white mt-8">3. Audio Disclaimer</h2>
          <p>
            The recitation voice streams of Sheikh Mishary Rashid Alafasy and Sheikh Qari Abdurrahmaan As-Sudais are loaded dynamically from public Quranic resources. We do not claim ownership of these audio streams.
          </p>

          <h2 className="text-lg font-bold text-white mt-8">4. Limitation of Liability</h2>
          <p>
            This website and its interactive engines are provided on an "as is" and "as available" basis without any warranty. We do not guarantee uninterrupted server uptime or complete correctness of phonics translations.
          </p>

          <h2 className="text-lg font-bold text-white mt-8">5. Governing Law</h2>
          <p>
            These terms are governed by standard international internet regulations.
          </p>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}
