import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata = {
  title: "Surah Yaseen Read Online, Download PDF, and Listen Audio",
  description: "Read Surah Yaseen online, download pdf, listen to audio with Roman transliteration translations (English, Urdu, and Hindi). Explore spiritual benefits!!!",
  alternates: {
    canonical: "https://surah-yaseen.org/",
  },
  keywords: "Surah Yaseen, Quran Chapter 36, Surah Yasin translation, read online, audio, MP3 download, PDF download, Urdu translation, Hindi translation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-0SRB1CLD7Q"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0SRB1CLD7Q');
        ` }} />
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
        <Script src="https://static.addtoany.com/menu/page.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
