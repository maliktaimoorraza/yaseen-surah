import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Surah Yaseen (سورة يس) - Read Online, Audio MP3, PDF & Benefits",
  description: "Read Surah Yaseen online with high-quality Arabic text, Roman transliteration, and English, Urdu, and Hindi translations. Access audio recitations and explore spiritual benefits.",
  keywords: "Surah Yaseen, Quran Chapter 36, Surah Yasin translation, read online, audio, MP3 download, PDF download, Urdu translation, Hindi translation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            if (localStorage.theme === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          } catch (_) {}
        `}} />
      </head>
      <body className="min-h-full flex flex-col bg-rich-black text-white antialiased">
        <Header />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
