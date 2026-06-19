export default function sitemap() {
  const baseUrl = "https://surah-yaseen.org";

  const paths = [
    { url: "", priority: 1.0, changeFrequency: "daily" },
    { url: "/translation", priority: 0.8, changeFrequency: "weekly" },
    { url: "/translation/english", priority: 0.8, changeFrequency: "weekly" },
    { url: "/translation/urdu", priority: 0.8, changeFrequency: "weekly" },
    { url: "/translation/hindi", priority: 0.8, changeFrequency: "weekly" },
    { url: "/pronunciation", priority: 0.8, changeFrequency: "weekly" },
    { url: "/benefits", priority: 0.8, changeFrequency: "weekly" },
    { url: "/reciters", priority: 0.8, changeFrequency: "weekly" },
    { url: "/contact", priority: 0.5, changeFrequency: "monthly" },
    { url: "/privacy-policy", priority: 0.5, changeFrequency: "monthly" },
    { url: "/terms", priority: 0.5, changeFrequency: "monthly" },
    { url: "/disclaimer", priority: 0.5, changeFrequency: "monthly" },
  ];

  return paths.map((path) => ({
    url: `${baseUrl}${path.url}`,
    lastModified: new Date(),
    changeFrequency: path.changeFrequency,
    priority: path.priority,
  }));
}
