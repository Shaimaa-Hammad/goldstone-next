import MerchantsPage from "@/components/pages/merchants/MerchantsPage";

export const revalidate = 3600;

export const metadata = {
  title: "Verified Gold Merchants",
  description: "Browse trusted, verified gold merchants worldwide.",
};

export default function Page() {
  return <MerchantsPage />;
}
