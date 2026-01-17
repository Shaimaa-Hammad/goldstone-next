import LandingPage from "@/components/pages/landing/LandingPage";

export const dynamic = "force-static";

export const metadata = {
  title: "Gold Trading Platform",
  description: "Trade gold securely with escrow and verified merchants.",
};

export default function Page() {
  return <LandingPage />;
}
