import HomepageClient from "@/components/HomepageClient";

export default function Homepage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How Many Ayat In Surah Yaseen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Surah Yaseen has eighty-three verses (ayat), seven hundred and twenty-nine words, and three thousand letters. It is the 36th Chapter of the Holy Qur'an, positioned primarily in Juz 22nd and 23rd, and is a Meccan Surah."
        }
      },
      {
        "@type": "Question",
        "name": "How To Learn Surah Yaseen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To easily memorize Surah Yasin, break it down into 5 verses for daily memorization. Along with that, you can use our word-by-word pronunciation guide. And listen to Mishary Alafasy or Qari Sudais recitation audio repeatedly to aid the process."
        }
      },
      {
        "@type": "Question",
        "name": "When To Read Surah Yaseen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Many scholars recommend reciting Surah Yaseen in the early morning. And authentic Hadiths say that its recitation fulfills all the daily spiritual needs for a believer. Additionally, reading it at night or for those passing away can bring peace, mercy, and forgiveness of sins."
        }
      },
      {
        "@type": "Question",
        "name": "How To Read Surah Yaseen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Read Surah Yaseen as per the tajweed rules by following phonetic transliteration. Ensure you are in a state of wudu, begin with seeking protection from Shaytan, recite slowly, and use our dual translation layers to properly understand its deep meanings."
        }
      },
      {
        "@type": "Question",
        "name": "What Is Surah Yaseen Good For?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Surah Yaseen is an effective source of spiritual healing, ease in difficulties, and forgiveness of sins. As per Hadiths, it is the heart of the Quran, its recitation strengthens faith, brings peace to restless minds, and fulfills many worldly needs."
        }
      },
      {
        "@type": "Question",
        "name": "Why Surah Yaseen Is Called Heart Of Quran?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Prophet Muhammad (PBUH) stated that everything has a heart, and the heart of the Qur'an is Surah Yaseen. It presents the core messages of Islam, focusing on tawheed (monotheism), risalah (prophethood), and the undeniable reality of life after death."
        }
      },
      {
        "@type": "Question",
        "name": "When Was Surah Yaseen Revealed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Surah Yaseen was revealed in Mecca during the middle phase of prophethood. Its revelation strengthen the faith of early Muslims, establish the truth of the Prophet’s mission, and warn the stubborn leaders of Quraysh who rejected monotheism."
        }
      },
      {
        "@type": "Question",
        "name": "Can You Recite Surah Yaseen Without Wudu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It is highly recommended and standard practice to perform wudu before touching the Arabic text of Surah Yaseen. However, if you are reciting from memory or reading translations from digital screens without touching Arabic script, wudu is not strictly mandatory."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c")
        }}
      />
      <HomepageClient />
    </>
  );
}
