import { PublicShell } from "@/components/layout/PublicShell";

export const metadata = {
  openGraph: {
    title: "Gold Trading Platform",
    description: "Buy and sell gold securely with escrow.",
    images: ["/og-image.png"],
  },
};

export default function PublicLayout({ children }) {
  return <PublicShell>{children}</PublicShell>;
}
