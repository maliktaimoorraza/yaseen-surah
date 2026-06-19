import ScrollToTop from "@/components/ScrollToTop";

export const metadata = {
  title: "Privacy Policy - Surah Yaseen Hub",
  description: "Learn how we protect, process, and secure user information on Surah Yaseen Hub.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-rich-black text-pure-white py-12 lg:py-16 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-white mb-8 border-b border-caribbean-green/10 pb-4">
          Privacy Policy
        </h1>
        
        <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
          <p><strong>Effective Date:</strong> June 19, 2026</p>
          
          <p>
            Welcome to Surah Yaseen Hub. We are committed to protecting your privacy and ensuring a secure experience. This Privacy Policy details the types of information we collect, how we use it, and how we protect your personal data.
          </p>

          <h2 className="text-lg font-bold text-white mt-8">1. Information We Collect</h2>
          <p>
            We collect minimal information to operate and maintain this website.
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Usage Data:</strong> We may collect non-personal analytics information regarding browser types, device sizes, pages viewed, and session durations to improve website performance.</li>
            <li><strong>Feedback Information:</strong> When you use our Contact form or Helpfulness feedback buttons, we track the name, email address, message content, and thumbs selections that you provide.</li>
          </ul>

          <h2 className="text-lg font-bold text-white mt-8">2. How We Use Information</h2>
          <p>
            The collected data is exclusively used for:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Optimizing website layouts and responsive components.</li>
            <li>Replying to customer service queries or technical feedback reports.</li>
            <li>Debugging Web Speech audio synthesis issues and improving search indexing.</li>
          </ul>

          <h2 className="text-lg font-bold text-white mt-8">3. Web Storage & Cookies</h2>
          <p>
            We use localized browser storage (localStorage) or standard session cookies to remember user-customized preferences, such as selected text sizes and active translations, avoiding server-side database tracking.
          </p>

          <h2 className="text-lg font-bold text-white mt-8">4. Security</h2>
          <p>
            We secure all website data using modern Secure Socket Layer (SSL/HTTPS) encryption protocols. No data is shared with or sold to third-party commercial marketing platforms.
          </p>

          <h2 className="text-lg font-bold text-white mt-8">5. Changes to This Policy</h2>
          <p>
            We reserve the right to modify this policy. Any changes will be updated on this page with a revised effective date.
          </p>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}
