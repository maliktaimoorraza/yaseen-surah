"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Simulate API request
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-rich-black text-pure-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-caribbean-green font-semibold mb-3.5 inline-block">
            Get in touch
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4 font-sans">
            Contact Us
          </h1>
          <p className="text-sm text-gray-300 leading-relaxed font-sans">
            Have questions, technical suggestions, or feedback regarding our translations, phonics guides, or reciters audio files? Please reach out using the form below. We read all reader submissions and respond promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Contact Details */}
          <div className="lg:col-span-1 flex flex-col gap-6 justify-between">
            <div className="glass-card rounded-2xl p-6 border border-caribbean-green/10">
              <h2 className="text-lg font-bold text-white mb-6 font-sans">
                Contact Details
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-bangladesh-green/40 border border-caribbean-green/20 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-caribbean-green" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-caribbean-green uppercase tracking-wider font-sans">Email Address</h3>
                    <p className="text-sm text-gray-300 mt-1">contact@surah-yaseen.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-bangladesh-green/40 border border-caribbean-green/20 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-caribbean-green" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-caribbean-green uppercase tracking-wider font-sans">Phone Helpline</h3>
                    <p className="text-sm text-gray-300 mt-1">+1 (803) 599-8339</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-bangladesh-green/40 border border-caribbean-green/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-caribbean-green" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-caribbean-green uppercase tracking-wider font-sans">Office HQ</h3>
                    <p className="text-sm text-gray-300 mt-1">Clifton Boulevard, Block 5, Karachi, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-caribbean-green/10 text-xs text-gray-400 font-sans leading-relaxed">
              We process personal feedback information in accordance with our Privacy Policy. All inputs are completely encrypted and handled securely.
            </div>
          </div>

          {/* Input form in a dark green panel */}
          <div className="lg:col-span-2">
            <div className="bg-dark-green border border-caribbean-green/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              {/* Background gradient accents */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-caribbean-green/5 blur-3xl rounded-full" />
              
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-caribbean-green" />
                <h2 className="text-xl font-bold text-white font-sans">
                  Send a Message
                </h2>
              </div>

              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
                  <CheckCircle className="w-16 h-16 text-caribbean-green mb-4 animate-bounce" />
                  <h3 className="text-lg font-bold text-white mb-2 font-sans">Message Sent Successfully!</h3>
                  <p className="text-sm text-gray-400 max-w-sm leading-relaxed mb-6 font-sans">
                    JazakAllahu Khairan. Thank you for reaching out to us. Our support team will review your message and reply via email within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-rich-black border border-caribbean-green/20 text-caribbean-green hover:bg-bangladesh-green hover:text-real-white px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* User Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="E.g., Muhammad Ali"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-rich-black border border-caribbean-green/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-caribbean-green/50 transition-colors w-full"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-rich-black border border-caribbean-green/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-caribbean-green/50 transition-colors w-full"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Write your suggestion, issue, or feedback here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-rich-black border border-caribbean-green/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-caribbean-green/50 transition-colors w-full resize-none"
                    ></textarea>
                  </div>

                  {/* CTA Submit */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-bangladesh-green to-caribbean-green hover:opacity-95 text-real-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-caribbean-green/10 transition-all font-sans cursor-pointer group"
                  >
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    <span>Submit Feedback Form</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}
