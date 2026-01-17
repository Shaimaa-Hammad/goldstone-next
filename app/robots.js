export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/dashboard", "/profile", "/admin", "/escrow"],
      },
    ],
    sitemap: "https://your-domain.com/sitemap.xml",
  };
}
