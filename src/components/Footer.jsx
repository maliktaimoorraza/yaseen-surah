"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-rich-black border-t border-caribbean-green/10 text-gray-300 py-16 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Branding */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-bangladesh-green to-caribbean-green flex items-center justify-center shadow-md shadow-caribbean-green/10 transition-transform group-hover:scale-105 duration-300">
                <svg className="w-6 h-6 text-real-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-wider text-pure-white font-sans">
                  سورہ یٰسین
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-caribbean-green/80 font-medium">
                  Surah Yaseen
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed font-sans mt-2">
              Discover the spiritual essence and deep wisdom of Surah Yaseen, the heart of the Noble Qur'an. Our platform provides high-quality recitation audio, detailed multi-language translations, word-by-word phonics pronunciation keys, and authenticated benefits, welcoming readers worldwide.
            </p>
          </div>

          {/* Column 2: Supporting Pages */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-caribbean-green mb-6 font-sans">
              Supporting Pages
            </h3>
            <ul className="space-y-3.5">
              <li>
                <Link href="/" className="text-sm hover:text-white transition-colors duration-200">
                  Read Online
                </Link>
              </li>
              <li>
                <Link href="/translation" className="text-sm hover:text-white transition-colors duration-200">
                  Translation Grid
                </Link>
              </li>
              <li>
                <Link href="/pronunciation" className="text-sm hover:text-white transition-colors duration-200">
                  Phonics & Pronunciation
                </Link>
              </li>
              <li>
                <Link href="/benefits" className="text-sm hover:text-white transition-colors duration-200">
                  Benefits & Blessings
                </Link>
              </li>
              <li>
                <Link href="/reciters" className="text-sm hover:text-white transition-colors duration-200">
                  Reciters Profiles
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Policies */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-caribbean-green mb-6 font-sans">
              Legal & Compliance
            </h3>
            <ul className="space-y-3.5">
              <li>
                <Link href="/privacy-policy" className="text-sm hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm hover:text-white transition-colors duration-200">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-sm hover:text-white transition-colors duration-200">
                  Disclaimer Notice
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-white transition-colors duration-200">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-sm hover:text-white transition-colors duration-200">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Engagement */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-caribbean-green mb-6 font-sans">
              Social Engagement
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-6 font-sans">
              Connect with us on our social platforms to stay updated, listen to daily verses, and share blessings with the global community.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {/* YouTube SVG */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-dark-green border border-caribbean-green/10 flex items-center justify-center text-gray-300 hover:text-real-white hover:bg-bangladesh-green hover:scale-105 hover:border-caribbean-green transition-all duration-300"
                aria-label="YouTube Channel"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.55 12 3.55 12 3.55s-7.53 0-9.388.505a3.003 3.003 0 0 0-2.11 2.108C0 8.022 0 12 0 12s0 3.978.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.47 20.45 12 20.45 12 20.45s7.53 0 9.388-.505a3.003 3.003 0 0 0 2.11-2.108C24 15.978 24 12 24 12s0-3.978-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              {/* Twitter/X SVG */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-dark-green border border-caribbean-green/10 flex items-center justify-center text-gray-300 hover:text-real-white hover:bg-bangladesh-green hover:scale-105 hover:border-caribbean-green transition-all duration-300"
                aria-label="Twitter Page"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* Facebook SVG */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-dark-green border border-caribbean-green/10 flex items-center justify-center text-gray-300 hover:text-real-white hover:bg-bangladesh-green hover:scale-105 hover:border-caribbean-green transition-all duration-300"
                aria-label="Facebook Page"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Instagram SVG */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-dark-green border border-caribbean-green/10 flex items-center justify-center text-gray-300 hover:text-real-white hover:bg-bangladesh-green hover:scale-105 hover:border-caribbean-green transition-all duration-300"
                aria-label="Instagram Profile"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-dark-green border border-caribbean-green/10 flex items-center justify-center text-gray-300 hover:text-real-white hover:bg-bangladesh-green hover:scale-105 hover:border-caribbean-green transition-all duration-300"
                aria-label="Pinterest Page"
              >
                {/* Custom Pinterest Icon */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.41 7.61 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.886 1.406-5.886s-.359-.714-.359-1.774c0-1.662.967-2.902 2.167-2.902 1.02 0 1.513.763 1.513 1.678 0 1.025-.652 2.561-.99 3.978-.283 1.187.593 2.155 1.764 2.155 2.119 0 3.748-2.232 3.748-5.454 0-2.852-2.049-4.847-4.979-4.847-3.398 0-5.393 2.544-5.393 5.178 0 1.024.394 2.124.887 2.723a.364.364 0 0 1 .082.343c-.097.404-.315 1.285-.357 1.464-.055.234-.182.285-.419.176-1.564-.725-2.544-3.003-2.544-4.829 0-3.928 2.855-7.537 8.232-7.537 4.321 0 7.68 3.078 7.68 7.199 0 4.29-2.705 7.747-6.46 7.747-1.262 0-2.449-.656-2.855-1.433 0 0-.624 2.378-.775 2.962-.28.1.077-.102.3-.64 2.455-1.127 1.435-5.962 1.435-9.453 0-6.196-8.961-6.04-8.961.12 0 1.979.775 3.328 1.908 3.328 1.125 0 2.036-.93 2.036-2.072 0-1.364-.473-2.316-.948-3.232C12.014 24 12.017 24 12.017 0z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-caribbean-green/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p className="font-sans">
            &copy; {new Date().getFullYear()} Surah Yaseen. All rights reserved. 
          </p>
          <p className="font-sans flex items-center gap-1.5">
            Designed for Spiritual Reflection and Study.
          </p>
        </div>
      </div>
    </footer>
  );
}
