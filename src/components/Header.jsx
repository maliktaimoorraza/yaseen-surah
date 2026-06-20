"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, BookOpen, Languages, Heart, Music, Phone, HelpCircle, Sun, Moon } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [transDropdown, setTransDropdown] = useState(false);
  const [recDropdown, setRecDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("light");
  const pathname = usePathname();

  // Load theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when path changes
  useEffect(() => {
    setIsOpen(false);
    setTransDropdown(false);
    setRecDropdown(false);
  }, [pathname]);

  const isActive = (path) => pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print ${
      isScrolled 
        ? "bg-dark-green border-b border-caribbean-green/10 shadow-lg shadow-rich-black/50 opacity-100 translate-y-0" 
        : "bg-dark-green border-b border-caribbean-green/10 shadow-lg shadow-rich-black/50 opacity-100 translate-y-0 lg:opacity-0 lg:pointer-events-none lg:-translate-y-full"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Branding */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <img src="/logo.jpg" alt="Surah Yaseen Logo" className="w-11 h-11 rounded-full object-cover border border-caribbean-green/20 shadow-md shadow-caribbean-green/10 transition-transform group-hover:scale-105 duration-300" />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-wider text-pure-white group-hover:text-caribbean-green transition-colors duration-300 font-sans">
                  سورہ یٰسین
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-caribbean-green/80 font-medium">
                  Surah Yaseen
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-bangladesh-green/20 ${
                isActive("/") ? "text-caribbean-green bg-bangladesh-green/30" : "text-gray-300 hover:text-white"
              }`}
            >
              Read Online
            </Link>

            {/* Translation Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setTransDropdown(!transDropdown);
                  setRecDropdown(false);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-bangladesh-green/20 flex items-center gap-1.5 ${
                  pathname.startsWith("/translation") ? "text-caribbean-green bg-bangladesh-green/30" : "text-gray-300 hover:text-white"
                }`}
              >
                <span>Translation</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${transDropdown ? "rotate-180" : ""}`} />
              </button>

              {transDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setTransDropdown(false)} />
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-dark-green border border-caribbean-green/20 shadow-2xl p-1.5 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Link
                      href="/translation"
                      className="block px-4 py-2.5 text-xs text-caribbean-green font-semibold uppercase tracking-wider hover:bg-bangladesh-green/10 rounded-lg border-b border-caribbean-green/5 mb-1"
                    >
                      All Translations
                    </Link>
                    <Link
                      href="/translation/urdu"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-bangladesh-green/30 rounded-lg transition-colors"
                    >
                      <span className="font-medium">اردو ترجمہ (Urdu)</span>
                    </Link>
                    <Link
                      href="/translation/hindi"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-bangladesh-green/30 rounded-lg transition-colors"
                    >
                      <span className="font-medium">हिन्दी अनुवाद (Hindi)</span>
                    </Link>
                    <Link
                      href="/translation/english"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-bangladesh-green/30 rounded-lg transition-colors"
                    >
                      <span className="font-medium">English Translation</span>
                    </Link>
                  </div>
                </>
              )}
            </div>

            <Link
              href="/pronunciation"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-bangladesh-green/20 ${
                isActive("/pronunciation") ? "text-caribbean-green bg-bangladesh-green/30" : "text-gray-300 hover:text-white"
              }`}
            >
              Pronunciation
            </Link>

            <Link
              href="/benefits"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-bangladesh-green/20 ${
                isActive("/benefits") ? "text-caribbean-green bg-bangladesh-green/30" : "text-gray-300 hover:text-white"
              }`}
            >
              Benefits
            </Link>

            {/* Reciters Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setRecDropdown(!recDropdown);
                  setTransDropdown(false);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-bangladesh-green/20 flex items-center gap-1.5 ${
                  pathname.startsWith("/reciters") ? "text-caribbean-green bg-bangladesh-green/30" : "text-gray-300 hover:text-white"
                }`}
              >
                <span>Reciters</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${recDropdown ? "rotate-180" : ""}`} />
              </button>

              {recDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setRecDropdown(false)} />
                  <div className="absolute right-0 mt-2 w-64 rounded-xl bg-dark-green border border-caribbean-green/20 shadow-2xl p-1.5 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Link
                      href="/reciters"
                      className="block px-4 py-2.5 text-xs text-caribbean-green font-semibold uppercase tracking-wider hover:bg-bangladesh-green/10 rounded-lg border-b border-caribbean-green/5 mb-1"
                    >
                      Reciters Profiles
                    </Link>
                    <Link
                      href="/reciters#sudais"
                      className="flex flex-col px-4 py-2 hover:bg-bangladesh-green/30 rounded-lg transition-colors group"
                    >
                      <span className="text-sm font-medium text-gray-300 group-hover:text-white">Qari Al-Sudais</span>
                      <span className="text-[10px] text-gray-400">Chief Imam of Grand Mosque</span>
                    </Link>
                    <Link
                      href="/reciters#alafasy"
                      className="flex flex-col px-4 py-2 hover:bg-bangladesh-green/30 rounded-lg transition-colors group mt-1"
                    >
                      <span className="text-sm font-medium text-gray-300 group-hover:text-white">Mishary Rashid Alafasy</span>
                      <span className="text-[10px] text-gray-400">Renowned Kuwaiti Reciter</span>
                    </Link>
                  </div>
                </>
              )}
            </div>

            <Link
              href="/contact"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-bangladesh-green/20 ${
                isActive("/contact") ? "text-caribbean-green bg-bangladesh-green/30" : "text-gray-300 hover:text-white"
              }`}
            >
              Contact Us
            </Link>

            {/* Desktop Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-3 p-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-bangladesh-green/20 transition-all duration-300 cursor-pointer"
              title="Toggle color theme"
              aria-label="Toggle color theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5 text-amber-400" />
              )}
            </button>
          </nav>

          {/* Hamburger Menu Trigger */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-bangladesh-green/20 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex justify-end">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-rich-black/70 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          {/* Menu Panel */}
          <div className="relative w-80 max-w-sm bg-dark-green border-l border-caribbean-green/20 h-full flex flex-col p-6 shadow-2xl z-50 animate-in slide-in-from-right duration-300 overflow-y-auto">
            <div className="flex items-center justify-between pb-6 border-b border-caribbean-green/10">
              <span className="text-lg font-bold text-pure-white font-sans flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-caribbean-green" /> Menu
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-bangladesh-green/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 py-6 space-y-2">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive("/") ? "bg-bangladesh-green text-real-white" : "text-gray-300 hover:bg-bangladesh-green/10 hover:text-white"
                }`}
              >
                <BookOpen className="w-5 h-5" />
                Read Online
              </Link>

              {/* Translation List Accordion */}
              <div>
                <button
                  onClick={() => setTransDropdown(!transDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-bangladesh-green/10 hover:text-white transition-all"
                >
                  <span className="flex items-center gap-3">
                    <Languages className="w-5 h-5" />
                    Translations
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${transDropdown ? "rotate-180" : ""}`} />
                </button>
                {transDropdown && (
                  <div className="pl-8 pr-4 py-1 space-y-1 bg-rich-black/30 rounded-xl mt-1 animate-in fade-in duration-200">
                    <Link
                      href="/translation"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 text-sm text-gray-400 hover:text-white"
                    >
                      All Translations
                    </Link>
                    <Link
                      href="/translation/urdu"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 text-sm text-gray-400 hover:text-white"
                    >
                      اردو ترجمہ (Urdu)
                    </Link>
                    <Link
                      href="/translation/hindi"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 text-sm text-gray-400 hover:text-white"
                    >
                      हिन्दी अनुवाद (Hindi)
                    </Link>
                    <Link
                      href="/translation/english"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 text-sm text-gray-400 hover:text-white"
                    >
                      English Translation
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/pronunciation"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive("/pronunciation") ? "bg-bangladesh-green text-real-white" : "text-gray-300 hover:bg-bangladesh-green/10 hover:text-white"
                }`}
              >
                <HelpCircle className="w-5 h-5" />
                Pronunciation
              </Link>

              <Link
                href="/benefits"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive("/benefits") ? "bg-bangladesh-green text-real-white" : "text-gray-300 hover:bg-bangladesh-green/10 hover:text-white"
                }`}
              >
                <Heart className="w-5 h-5" />
                Benefits
              </Link>

              {/* Reciters Accordion */}
              <div>
                <button
                  onClick={() => setRecDropdown(!recDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-bangladesh-green/10 hover:text-white transition-all"
                >
                  <span className="flex items-center gap-3">
                    <Music className="w-5 h-5" />
                    Reciters
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${recDropdown ? "rotate-180" : ""}`} />
                </button>
                {recDropdown && (
                  <div className="pl-8 pr-4 py-1 space-y-1 bg-rich-black/30 rounded-xl mt-1 animate-in fade-in duration-200">
                    <Link
                      href="/reciters"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 text-sm text-gray-400 hover:text-white"
                    >
                      Reciters Profiles
                    </Link>
                    <Link
                      href="/reciters#sudais"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 text-sm text-gray-400 hover:text-white"
                    >
                      Qari Al-Sudais
                    </Link>
                    <Link
                      href="/reciters#alafasy"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 text-sm text-gray-400 hover:text-white"
                    >
                      Mishary Rashid Alafasy
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive("/contact") ? "bg-bangladesh-green text-real-white" : "text-gray-300 hover:bg-bangladesh-green/10 hover:text-white"
                }`}
              >
                <Phone className="w-5 h-5" />
                Contact Us
              </Link>
            </nav>

            {/* Theme Toggle in Mobile Drawer */}
            <div className="py-4 border-t border-caribbean-green/10 flex items-center justify-between mt-2">
              <span className="text-sm font-semibold text-gray-300">Theme</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-bangladesh-green/20 border border-caribbean-green/20 text-caribbean-green hover:text-white hover:bg-bangladesh-green/40 transition-all duration-300"
              >
                {theme === "light" ? (
                  <>
                    <Moon className="w-4 h-4" />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>Light Mode</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-6 border-t border-caribbean-green/10 text-center text-xs text-gray-400">
              © {new Date().getFullYear()} Surah Yaseen
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
