import MarketPage from "@/components/pages/market/MarketPage";

export const revalidate = 60;

export const metadata = {
  title: "Gold Market Prices",
  description: "Live gold prices, charts, and historical trends.",
};

export default function Page() {
  return <MarketPage />;
}
