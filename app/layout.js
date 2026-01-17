import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: {
    default: "Gold Trading Platform",
    template: "%s | Gold Trading Platform",
  },
  description: "Secure gold trading platform with escrow and verified merchants.",
  metadataBase: new URL("https://your-domain.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
